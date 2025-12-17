'use client';
import React from 'react';
import { FaWhatsapp, FaLinkedin, FaPrint, FaCopy } from 'react-icons/fa';

const ShareTools = ({ title }: { title: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = (platform: 'whatsapp' | 'linkedin') => {
    const url = window.location.href;
    const text = `Check out this ${title} on Fincado: ${url}`;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
        '_blank'
      );
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-widget no-print">
      <span className="share-label">Share:</span>

      <button
        onClick={() => handleShare('whatsapp')}
        className="share-btn whatsapp"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={18} />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="share-btn linkedin"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={18} />
      </button>

      <div className="divider"></div>

      <button
        onClick={handlePrint}
        className="share-btn print"
        aria-label="Print Page"
      >
        <FaPrint size={16} /> Print
      </button>

      <button
        onClick={copyLink}
        className="share-btn copy"
        aria-label="Copy Link"
      >
        <FaCopy size={16} /> {copied ? 'Copied!' : 'Copy'}
      </button>

      <style jsx>{`
        .share-widget {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 50px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          margin: 24px 0;
          flex-wrap: wrap;
        }
        .share-label {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
        }
        .share-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border: none;
          background: none;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 6px;
          transition: all 0.2s;
          font-size: 13px;
          font-weight: 500;
        }
        .share-btn:hover {
          transform: translateY(-1px);
        }
        .whatsapp {
          color: #25d366;
          background: #dcfce7;
        }
        .linkedin {
          color: #0077b5;
          background: #e0f2fe;
        }
        .print {
          color: #475569;
          background: #f1f5f9;
        }
        .copy {
          color: #475569;
          background: #f1f5f9;
        }
        .divider {
          width: 1px;
          height: 20px;
          background: #cbd5e1;
          margin: 0 4px;
        }
      `}</style>
    </div>
  );
};

export default ShareTools;
