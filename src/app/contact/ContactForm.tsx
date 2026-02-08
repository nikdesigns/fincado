// src/app/contact/ContactForm.tsx
'use client';
import React, { useState } from 'react';

type Props = {
  supportEmail: string;
  officeCity?: string;
};

export default function ContactForm({ supportEmail, officeCity }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Support');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Build mailto link and open user's mail client
  function handleSend(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(`[${topic}] ${name || 'Anonymous'}`);
    const bodyLines = [
      `Name: ${name || '—'}`,
      `Email: ${email || '—'}`,
      `Topic: ${topic}`,
      '',
      'Message:',
      message || '—',
      '',
      `— Sent from Fincado contact form (office: ${officeCity || 'N/A'})`
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    const mailto = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    // Try opening mailto - most browsers will open default mail client
    window.location.href = mailto;
  }

  // Copy email to clipboard fallback
  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(supportEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <form onSubmit={handleSend} style={{ display: 'grid', gap: 12 }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <label>
            Your name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name (optional)"
            />
          </label>

          <label>
            Your email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com (optional but helpful)"
            />
          </label>
        </div>

        <label>
          Topic
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option>Support</option>
            <option>Partnership</option>
            <option>Press</option>
            <option>Feedback</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Message
          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what's happening or what you need..."
          />
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="primary-cta" type="submit">
            Open Mail Client
          </button>
          <button type="button" onClick={handleCopyEmail}>
            {copied ? 'Email Copied ✓' : 'Copy Support Email'}
          </button>
          <a
            className="apply-btn"
            href={`mailto:${supportEmail}?subject=Quick question`}
            style={{ alignSelf: 'center' }}
          >
            Quick Email
          </a>
        </div>
      </form>

      <div style={{ display: 'grid', gap: 8, marginTop: 6 }}>
        <p style={{ margin: 0 }}>
          Prefer not to use your mail client? Copy the support email and send
          from any web client or ticketing system.
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <strong>Support:</strong>
          <a href={`mailto:${supportEmail}`} className="contact-email">
            {supportEmail}
          </a>
          <button
            onClick={handleCopyEmail}
            style={{ padding: '6px 10px', borderRadius: 8 }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
