import Image from 'next/image';

type BrandLogoVariant = 'horizontal' | 'vertical';

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

const SOURCES: Record<BrandLogoVariant, string> = {
  horizontal: '/brand/logo-horizontal.svg',
  vertical: '/brand/logo-vertical.svg',
};

export default function BrandLogo({
  variant = 'horizontal',
  width = 172,
  height = 40,
  className = '',
  priority = false,
  alt = 'Fincado',
}: BrandLogoProps) {
  return (
    <Image
      src={SOURCES[variant]}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
