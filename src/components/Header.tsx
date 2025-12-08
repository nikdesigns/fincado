'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      {' '}
      {/* ✅ SINGLE STABLE ROOT FIXES CHILDREN ERROR */}
      {/* ✅ NAVBAR */}
      <header className="site-header">
        <div className="nav-wrap">
          {/* LOGO */}
          <Link href="/" className="logo">
            Fincado
          </Link>

          {/* HAMBURGER */}
          <button
            className="hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* NAV LINKS */}
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            <Link href="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>

            <Link
              href="/emi-calculator"
              className={isActive('/emi-calculator') ? 'active' : ''}
            >
              EMI
            </Link>

            <Link
              href="/sip-calculator"
              className={isActive('/sip-calculator') ? 'active' : ''}
            >
              SIP
            </Link>

            <Link
              href="/fd-calculator"
              className={isActive('/fd-calculator') ? 'active' : ''}
            >
              FD
            </Link>

            {/* LOANS DROPDOWN */}
            <div className="mega-wrap" ref={megaRef}>
              <button
                type="button"
                className={`mega-btn ${isActive('/loans') ? 'active' : ''}`}
                onClick={() => setMegaOpen(!megaOpen)}
              >
                Loans ▾
              </button>

              {megaOpen && (
                <div className="mega-menu">
                  <Link href="/loans/home-loan">Home Loan</Link>
                  <Link href="/loans/personal-loan">Personal Loan</Link>
                  <Link href="/loans/car-loan">Car Loan</Link>
                  <Link href="/loans/education-loan">Education Loan</Link>
                </div>
              )}
            </div>

            {/* CONTACT */}
            <Link
              href="/contact"
              className={`nav-cta ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
      {/* ✅ BREADCRUMB (HIDDEN ON HOMEPAGE) */}
      {pathname !== '/' && (
        <div className="breadcrumb">
          <div className="breadcrumb-inner">
            <Link href="/">Home</Link>

            {pathname
              .split('/')
              .filter(Boolean)
              .map((part, i, arr) => {
                const href = '/' + arr.slice(0, i + 1).join('/');
                return (
                  <span key={href}>
                    {' '}
                    ›{' '}
                    <Link href={href}>
                      {part.replace(/-/g, ' ').toUpperCase()}
                    </Link>
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
