import React from 'react';
import RelatedTopicsSidebar from '@/components/RelatedTopicsSidebar';

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 24,
        padding: '36px 20px',
      }}
    >
      <div style={{ minWidth: 0 }}>{children}</div>

      <aside style={{ position: 'sticky', top: 90, height: 'fit-content' }}>
        <RelatedTopicsSidebar />
      </aside>
    </main>
  );
}
