'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <div className="footer">
      <a href='https://sambender.net' target='_blank'>Designed by Sam Bender 2025</a>

      <style jsx>{`
        .footer {
          margin-top: 1rem;
          padding: 1rem 0;
          border-top: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          font-family: 'CoseGrottesche', sans-serif;
          font-size: 1rem;
          z-index: 2;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
