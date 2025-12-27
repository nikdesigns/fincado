import Link from 'next/link';

interface LanguageToggleProps {
  path: string;
}

export default function LanguageToggle({ path }: LanguageToggleProps) {
  // Logic: If the target path starts with '/hi', we are going TO Hindi.
  // Otherwise, we are going TO English.
  const isTargetHindi = path.startsWith('/hi');

  return (
    <Link
      href={path}
      className="no-print"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: '#fff1f2', // Rose-50
        border: '1px solid #fb7185', // Rose-400
        borderRadius: '100px',
        color: '#e11d48', // Rose-600
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
        marginBottom: '24px',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(225, 29, 72, 0.1)',
      }}
    >
      <span style={{ fontSize: '16px' }}>{isTargetHindi ? '🇮🇳' : '🇺🇸'}</span>
      <span>
        {isTargetHindi ? 'हिंदी में देखें (Read in Hindi)' : 'Read in English'}
      </span>
    </Link>
  );
}
