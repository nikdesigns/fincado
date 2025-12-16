'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// --- CONFIGURATION: ALL CALCULATORS FROM REPO ---
const CALCULATOR_MENU = [
  {
    category: 'Loans',
    items: [
      { label: 'EMI Calculator', href: '/emi-calculator' },
      { label: 'Home Loan', href: '/loans/home-loan' },
      { label: 'Car Loan', href: '/loans/car-loan' },
      { label: 'Personal Loan', href: '/loans/personal-loan' },
      { label: 'Education Loan', href: '/loans/education-loan' },
    ],
  },
  {
    category: 'Investment',
    items: [
      { label: 'SIP Calculator', href: '/sip-calculator' },
      { label: 'FD Calculator', href: '/fd-calculator' },
      { label: 'RD Calculator', href: '/rd-calculator' },
      { label: 'PPF Calculator', href: '/ppf-calculator' },
      { label: 'Lumpsum', href: '/lumpsum-calculator' },
      { label: 'SWP Calculator', href: '/swp-calculator' },
      { label: 'SSY (Sukanya)', href: '/sukanya-samriddhi' },
      { label: 'Mutual Funds', href: '/mutual-funds' },
    ],
  },
  {
    category: 'Retirement',
    items: [
      { label: 'Retirement Planner', href: '/retirement-calculator' },
      { label: 'EPF Calculator', href: '/epf-calculator' },
      { label: 'APY Calculator', href: '/apy-calculator' },
      { label: 'FIRE Calculator', href: '/fire-calculator' },
    ],
  },
  {
    category: 'Tools & Tax',
    items: [
      { label: 'Credit Score', href: '/credit-score' },
      { label: 'GST Calculator', href: '/gst-calculator' },
      { label: 'Inflation', href: '/inflation-calculator' },
      { label: 'Simple Interest', href: '/simple-interest-calculator' },
      { label: 'All Calculators', href: '/calculators', bold: true },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaTimer = useRef<NodeJS.Timeout | null>(null);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
      setMegaMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Desktop Hover Logic
  const handleMouseEnter = () => {
    if (window.innerWidth > 1024) {
      if (megaTimer.current) clearTimeout(megaTimer.current);
      setMegaMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      megaTimer.current = setTimeout(() => setMegaMenuOpen(false), 200);
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* LOGO */}
          <Link href="/" className="nav-logo">
            Fincado
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <Link
              href="/"
              className={`nav-item ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>

            {/* MEGA MENU TRIGGER */}
            <div
              className="nav-dropdown-wrap"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nav-item dropdown-trigger ${
                  megaMenuOpen ? 'active' : ''
                }`}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
              >
                Calculators ▾
              </button>

              {/* MEGA MENU DROPDOWN */}
              <div className={`mega-menu ${megaMenuOpen ? 'show' : ''}`}>
                <div className="mega-grid">
                  {CALCULATOR_MENU.map((section) => (
                    <div key={section.category} className="mega-col">
                      <h4 className="mega-heading">{section.category}</h4>
                      <ul className="mega-list">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`mega-link ${
                                item.bold ? 'mega-link-bold' : ''
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/guides"
              className={`nav-item ${isActive('/guides') ? 'active' : ''}`}
            >
              Guides
            </Link>
          </nav>

          {/* CTA & MOBILE TOGGLE */}
          <div className="nav-actions">
            {/* ✅ CHANGED TO EMI CALCULATOR */}
            <Link href="/emi-calculator" className="nav-btn desktop-only">
              EMI Calculator
            </Link>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* MOBILE MENU (Slide Down) */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-links">
            <Link href="/" className="mobile-link">
              Home
            </Link>

            {CALCULATOR_MENU.map((section) => (
              <div key={section.category}>
                <div className="mobile-divider">{section.category}</div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="mobile-sublink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="mobile-divider">Resources</div>
            <Link href="/guides" className="mobile-link">
              Guides
            </Link>
            <Link href="/contact" className="mobile-link">
              Contact
            </Link>

            <div style={{ marginTop: 12 }}>
              {/* ✅ CHANGED TO EMI CALCULATOR */}
              <Link href="/emi-calculator" className="mobile-btn">
                EMI Calculator
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
