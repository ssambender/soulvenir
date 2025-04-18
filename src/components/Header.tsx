'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="left">
        <Image src="/icon.png" alt="Logo" width={28} height={28} />
        <Link href="/" className="nav-link">
          <span className="hoverable-link">Home</span>
        </Link>
      </div>

      <nav className="right">
        <Link href="/mint" className="nav-link">
          <span className="hoverable-link">create</span>
        </Link>
        <Link href="/my-wallet" className="nav-link">
          <span className="hoverable-link">my wallet</span>
        </Link>
        <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <span className='connect-btn'>
            connect to metamask <Image src="/Meta-fox.svg" width={28} height={28} alt="metamask logo" />
          </span>
        </button>
      </nav>

      <style jsx>{`
        .header {
          padding: 1rem 5%;
          border-bottom: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          font-family: 'CoseGrottesche', sans-serif;
          font-size: 1.5rem;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .right {
          display: flex;
          gap: 5rem;
        }

        .nav-link {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        .hoverable-link:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        .connect-btn {
          background-color: black;
          color: white;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .connect-btn:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        @media (orientation: portrait) {
          .header {
            font-size: 1rem;
          }

          .right {
            gap: 1rem;
          }
        }
      `}</style>
    </header>
  );
}
