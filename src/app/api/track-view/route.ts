import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const DATA = path.join(process.cwd(), 'src/data/views.json');

function readData() {
  try {
    if (!fs.existsSync(DATA)) return {};
    const raw = fs.readFileSync(DATA, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    return {};
  }
}

function writeData(obj: any) {
  fs.mkdirSync(path.dirname(DATA), { recursive: true });
  fs.writeFileSync(DATA, JSON.stringify(obj, null, 2), 'utf8');
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const top = Number(url.searchParams.get('top') || 0);

  const data = readData();
  const list = Object.entries(data).map(([slug, rec]: any) => ({
    slug,
    title: rec.title,
    views: rec.views || 0,
  }));

  list.sort((a, b) => b.views - a.views);
  const out = top > 0 ? list.slice(0, top) : list;

  return NextResponse.json({ top: out });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, title } = body;
    if (!slug)
      return NextResponse.json({ error: 'missing slug' }, { status: 400 });

    const data = readData();
    if (!data[slug]) data[slug] = { title: title || slug, views: 0 };
    data[slug].views = (data[slug].views || 0) + 1;
    if (title) data[slug].title = title;

    writeData(data);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}
