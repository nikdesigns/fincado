'use client';

export default function Contact() {
  return (
    <main className="article" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Contact Us</h1>

      <p>
        If you have questions, suggestions, or business inquiries, feel free to
        contact us using the form below.
      </p>

      <form
        style={{
          marginTop: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          alert('Form submitted! (Demo only)');
        }}
      >
        <label>
          Name
          <input type="text" required />
        </label>

        <label>
          Email
          <input type="email" required />
        </label>

        <label>
          Message
          <textarea required />
        </label>

        <button type="submit" style={{ width: 160 }}>
          Send Message
        </button>
      </form>

      <p style={{ marginTop: 20, fontSize: 14, color: '#64748b' }}>
        This is a demo contact form. You can connect it to Formspree, Getform,
        or your hosting email later.
      </p>
    </main>
  );
}
