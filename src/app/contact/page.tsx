// src/app/contact/page.tsx
import type { Metadata } from 'next';
import '@/styles/terms.css';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Fincado',
  description:
    'Contact Fincado — support, partnerships, press and product feedback. Reach out for help or collaborations.',
};

const SUPPORT_EMAIL = 'support@fincado.com';
const PHONE = ''; // optional: add phone if you have one
const OFFICE_CITY = 'Mumbai';

export default function ContactPage(): JSX.Element {
  return (
    <main className="terms-root">
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">Contact Fincado</h1>
          <p className="terms-sub">We’re here to help — reach out to us</p>
          <p className="terms-lead">
            Whether you have a product question, partnership idea, press
            inquiry, or feedback about calculators and guides, we read every
            message and reply as quickly as possible.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="On this page">
          <strong>Quick links</strong>
          <ul>
            <li>
              <a href="#support">Support</a>
            </li>
            <li>
              <a href="#partnerships">Partnerships</a>
            </li>
            <li>
              <a href="#press">Press</a>
            </li>
            <li>
              <a href="#feedback">Feedback</a>
            </li>
            <li>
              <a href="#form">Send a message</a>
            </li>
          </ul>
        </nav>

        <article className="terms-article">
          <section id="support" className="terms-section">
            <h2>Support</h2>
            <p>
              For help with calculators, article corrections, or technical
              issues, email:
            </p>

            <div
              className="contact-card"
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <a className="contact-email" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              <p className="contact-small">
                Typical response time: 1–3 business days
              </p>
            </div>

            <p style={{ marginTop: 12 }}>
              Before emailing, you may find answers in our{' '}
              <a className="link" href="/faq">
                FAQ
              </a>{' '}
              or the relevant calculator page.
            </p>
          </section>

          <section id="partnerships" className="terms-section">
            <h2>Partnerships & Business Inquiries</h2>
            <p>
              Interested in partnering (content, tools, or affiliate
              relationships)? Please include:
            </p>
            <ul className="terms-list">
              <li>Company name and website</li>
              <li>Short description of the partnership idea</li>
              <li>Expected business model and next steps</li>
            </ul>
            <p>
              Send partnership requests to the same support email with the
              subject: <code>Partnership Inquiry</code>.
            </p>
          </section>

          <section id="press" className="terms-section">
            <h2>Press & Media</h2>
            <p>
              For press requests or interview availability, include details
              about the outlet, topic, and deadline. We aim to respond quickly
              for timely coverage.
            </p>
          </section>

          <section id="feedback" className="terms-section">
            <h2>Product Feedback</h2>
            <p>
              We love hearing suggestions. If you found an article inaccurate, a
              broken calculator, or an improvement idea, please describe the
              issue and the page URL where it occurs.
            </p>
          </section>

          <section id="form" className="terms-section">
            <h2>Send a message</h2>
            <p>
              Use the form below — it will open your mail client to deliver the
              message. If mailto isn’t available, use the copy button to copy
              the support email.
            </p>

            <ContactForm
              supportEmail={SUPPORT_EMAIL}
              officeCity={OFFICE_CITY}
            />
          </section>

          <footer className="terms-footer" style={{ marginTop: 16 }}>
            <p className="muted">
              By contacting us you consent to Fincado storing your message and
              email for the purpose of responding. For details see our{' '}
              <a className="link" href="/privacy">
                Privacy Policy
              </a>
              .
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
