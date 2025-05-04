// Header bar component

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@/contexts/WalletContext';

export default function Header() {
  const { walletAddress, connectWallet } = useWallet();

  return (
    <header className="header">
      <div className="left">
        <Image src="/icon.png" alt="Logo" width={28} height={28} />
        <Link href="/" className="nav-link">
          <span className="hoverable-link">Home</span>
        </Link>
      </div>

      <nav className="right">
        <Link href="/mint" className="nav-link" style={{display: 'flex'}}>
          <span className="hoverable-link" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 3}}>create</span>
        </Link>
        <Link href="/my-wallet" className="nav-link" style={{display: 'flex'}}>
          <span className="hoverable-link" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 3}}>my wallet</span>
        </Link>
        <button onClick={connectWallet} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span className="connect-btn">
            <span className="connect-text">
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : 'connect to metamask'}
            </span>
            <Image src="/Meta-fox.svg" width={28} height={28} alt="metamask logo" />
          </span>
        </button>
      </nav>

      <style jsx>{`
        .header {
          padding: 1rem 15%;
          width: 100%;
          border-bottom: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          font-family: 'CoseGrottesche', sans-serif;
          font-size: 1.5rem;
          position: fixed;
          top: 0;
          z-index: 10;
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
            padding: 1rem 5%;
          }

          .right {
            gap: 1rem;
          }

          .hoverable-link,
          .connect-btn {
            font-size: 0.75rem;
            text-align: center;
          }
            
          .nav-link {
            display: flex;
          }

          .connect-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
