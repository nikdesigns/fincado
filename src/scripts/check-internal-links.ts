import * as fs from 'fs';
import * as path from 'path';

type BrokenLink = { file: string; link: string };

const SOURCE_DIR = path.join(process.cwd(), 'src');
const APP_DIR = path.join(process.cwd(), 'src', 'app');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SOURCE_EXTENSIONS = new Set([
  '.md',
  '.json',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
]);
const STATIC_FILE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.ico',
  '.gif',
  '.avif',
  '.txt',
  '.xml',
  '.json',
  '.css',
  '.js',
  '.woff',
  '.woff2',
  '.ttf',
  '.map',
]);

function getAllFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const output: string[] = [];
  const stack = [dir];

  while (stack.length) {
    const current = stack.pop()!;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else {
        output.push(fullPath);
      }
    }
  }

  return output;
}

function normalizePath(input: string): string {
  const trimmed = input.split('#')[0].split('?')[0].trim();
  if (trimmed === '') return '/';
  if (!trimmed.startsWith('/')) return trimmed;
  if (trimmed === '/') return '/';
  return trimmed.replace(/\/+$/, '');
}

function toRouteFromPage(pagePath: string): string {
  const relative = pagePath
    .replace(APP_DIR, '')
    .replace(/\\/g, '/')
    .replace(/\/page\.tsx$/, '');
  return normalizePath(relative || '/');
}

function routePatternFromDynamicRoute(route: string): RegExp {
  const escaped = route
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      if (/^\[\.\.\..+\]$/.test(segment)) return '.+';
      if (/^\[.+\]$/.test(segment)) return '[^/]+';
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');

  return new RegExp(`^/${escaped}$`);
}

function collectRoutes() {
  const pageFiles = getAllFiles(APP_DIR).filter((file) =>
    file.endsWith('/page.tsx'),
  );

  const staticRoutes = new Set<string>();
  const dynamicPatterns: RegExp[] = [];

  for (const file of pageFiles) {
    const route = toRouteFromPage(file);
    if (route.includes('[')) {
      dynamicPatterns.push(routePatternFromDynamicRoute(route));
    } else {
      staticRoutes.add(route);
    }
  }

  return { staticRoutes, dynamicPatterns };
}

function extractLinks(content: string): string[] {
  const links = new Set<string>();

  const markdownRegex = /\[[^\]]+?\]\((\/[^)\s]+)\)/g;
  const attributeRegex =
    /(?:href|src|url|canonical|path)\s*[:=]\s*['"](\/[^'"\\s]*)['"]/g;

  for (const regex of [markdownRegex, attributeRegex]) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      const value = match[1];
      if (!value || value.startsWith('//')) continue;
      links.add(value);
    }
  }

  return [...links];
}

function isStaticAssetPath(linkPath: string): boolean {
  const ext = path.extname(linkPath).toLowerCase();
  return STATIC_FILE_EXTENSIONS.has(ext);
}

function routeExists(
  route: string,
  staticRoutes: Set<string>,
  dynamicPatterns: RegExp[],
): boolean {
  if (route === '/') return true;
  if (staticRoutes.has(route)) return true;
  return dynamicPatterns.some((pattern) => pattern.test(route));
}

function assetExists(assetPath: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, assetPath));
}

function main() {
  console.log('🔍 Checking internal links across source files...\n');

  const { staticRoutes, dynamicPatterns } = collectRoutes();
  const files = getAllFiles(SOURCE_DIR).filter((file) =>
    SOURCE_EXTENSIONS.has(path.extname(file)),
  );

  const brokenLinks: BrokenLink[] = [];

  for (const filePath of files) {
    if (filePath.includes('/src/scripts/')) continue;

    const content = fs.readFileSync(filePath, 'utf-8');
    const links = extractLinks(content);

    for (const rawLink of links) {
      if (!rawLink.startsWith('/')) continue;

      const normalized = normalizePath(rawLink);
      if (normalized === '' || normalized === '/api') continue;
      if (normalized.startsWith('/api/')) continue;

      if (isStaticAssetPath(normalized)) {
        if (!assetExists(normalized)) {
          brokenLinks.push({
            file: filePath.replace(process.cwd(), ''),
            link: rawLink,
          });
        }
        continue;
      }

      if (!routeExists(normalized, staticRoutes, dynamicPatterns)) {
        brokenLinks.push({
          file: filePath.replace(process.cwd(), ''),
          link: rawLink,
        });
      }
    }
  }

  if (brokenLinks.length > 0) {
    console.error(`❌ Found ${brokenLinks.length} broken internal link(s):\n`);
    for (const broken of brokenLinks) {
      console.error(`  ${broken.file}: ${broken.link}`);
    }
    process.exit(1);
  }

  console.log('✅ All internal links are valid!\n');
}

main();
