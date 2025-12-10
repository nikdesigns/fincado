'use client';
import React, { useEffect, useState } from 'react';

type ViewRecord = { slug: string; title: string; views: number };

export default function TrendingGuides() {
  const [items, setItems] = useState<ViewRecord[]>([]);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await fetch('/api/track-view?top=6');
        if (!res.ok) return;
        const json = await res.json();
        setItems(json.top || []);
      } catch (e) {
        // ignore
      }
    }
    fetchTop();
  }, []);

  if (items.length === 0) return <small>No trending guides yet</small>;

  return (
    <ul className="trending-list">
      {items.map((i) => (
        <li key={i.slug}>
          <a href={`/guides/${i.slug}`}>{i.title}</a>
          <span className="trend-count">{i.views}</span>
        </li>
      ))}
    </ul>
  );
}
