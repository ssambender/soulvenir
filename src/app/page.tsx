'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './globals.css';
import HoloCard from '@/components/Holocard';

const imageList = [
  'exampleAuthentic.png',
  'exampleFootball.png',
  'exampleMeetup.png',
  'examplePlayerCard.png',
  'exampleProtest.png',
  'exampleReponse.png',
  'exampleRugby.png',
  'exampleSeasonPass.png',
  'exampleVespa.png',
  'exampleSailor.png',
  'exampleBored.png',
  'exampleAstro.png',
  'examplePhillies.png'
];

// Fisher–Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HomePage() {
  const [shuffledImages, setShuffledImages] = useState<string[][]>([]);

  useEffect(() => {
    const result = [0, 1, 2].map((rowIndex) => {
      const isMiddle = rowIndex === 1;
      const duplicateCount = isMiddle ? 5 : 3;
  
      // Only shuffle ONCE per row
      const shuffled = shuffleArray(imageList);
  
      // Repeat that same shuffled sequence
      return Array(duplicateCount).fill(shuffled).flat();
    });
  
    setShuffledImages(result);
  }, []);
  

  return (
    <main>
      <div style={styles.hero}>
        <div style={styles.imageRows}>
          {[0, 1, 2].map((rowIndex) => {
            const isMiddle = rowIndex === 1;

            return (
              <div key={rowIndex} style={styles.rowContainer}>
                <div
                  style={{
                    ...styles.rowWrapper,
                    transform: isMiddle ? 'translateX(-50%)' : undefined,
                    animation: `${isMiddle ? 'carouselRight' : 'carouselLeft'} ${isMiddle ? '160s' : '60s'} linear infinite`,
                  }}
                >
                  {shuffledImages[rowIndex]?.map((img, i) => (
                    <Image
                      key={`${rowIndex}-${i}`}
                      src={`/pictures/${img}`}
                      alt="Scrolling image"
                      width={220}
                      height={130}
                      style={styles.image}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <h1 style={styles.title}>Soulvenir</h1>
        <div style={styles.fadeOut}></div>
      </div>

      <div style={{width: '100%', padding: '40px 0 80px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flexDirection: 'column', textAlign: 'center'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem'}}>
          <span style={{fontWeight: 'bold'}}>Attend events, make purchases, or verify authenticity with Soulvenirs!</span>
          <span>To get started, <a style={{textDecoration: 'underline', cursor: 'pointer'}}>connect your Metamask wallet</a>!</span>
        </div>

        <span style={{fontSize: '2rem', display: 'flex', alignItems: 'center'}}>
          <span style={{fontFamily: "'CoseGrottesche', sans-serif", fontSize: '3rem', marginRight: '0.5rem'}}>
            create</span>
            <span style={{paddingTop: 12}}>collectible souldbound NFTs for your event, however you see fit.</span>
        </span>

        <span style={{fontSize: '2rem', display: 'flex', alignItems: 'center'}}>
          <span style={{fontFamily: "'CoseGrottesche', sans-serif", fontSize: '3rem', marginRight: '0.5rem'}}>
            redeem</span>
            <span style={{paddingTop: 12}}>cards to prove attendance, show authenticity, or verify purchases.</span>
        </span>

        <span style={{fontSize: '2rem', display: 'flex', alignItems: 'center'}}>
          <span style={{fontFamily: "'CoseGrottesche', sans-serif", fontSize: '3rem', marginRight: '0.5rem'}}>
            view</span>
            <span style={{paddingTop: 12}}>your collection to see past experiences, purchase history, or just show off.</span>
        </span>
        
        <h1 style={{fontSize: '4rem', fontStyle: 'italic'}}>Use Cases:</h1>

        <div style={{display: 'flex', gap: '2rem'}}>
          <HoloCard imageUrl="/pictures/exampleMeetup.png" />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '500px', justifyContent: 'center'}}>
            <span style={{fontFamily: "'CoseGrottesche', sans-serif", fontSize: '3rem', marginRight: '0.5rem'}}>Meetups</span>
            <span style={{paddingTop: 12, textAlign: 'left', fontSize: '1.5rem'}}>
              Soulvenirs offer a lightweight, verifiable way to document presence at in-person or hybrid events. Whether you're hosting a hackathon, protest, or motorcycle meetup, these tokens serve as permanent, non-transferable proof that someone showed up. Clean UX, no gimmicks — just a sleek card that lives on-chain and in wallets.
            </span>
          </div>
        </div>

        <div style={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '500px', justifyContent: 'center'}}>
            <span style={{fontFamily: "'CoseGrottesche', sans-serif", fontSize: '3rem', marginRight: '0.5rem'}}>Collectibles</span>
            <span style={{paddingTop: 12, textAlign: 'left', fontSize: '1.5rem'}}>
              Drop custom, non-transferable NFTs tied to product releases, moments, or brand activations. Soulvenirs are built for on-chain identity — not speculation. They're visually rich, cryptographically unique, and designed to give your audience something that actually means something.
            </span>
          </div>
          <HoloCard imageUrl="/pictures/exampleSailor.png" />  
        </div>

        <div style={{display: 'flex', gap: '2rem'}}>
          <HoloCard imageUrl="/pictures/exampleRugby.png" />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '500px', justifyContent: 'center'}}>
            <span style={{fontFamily: "'CoseGrottesche', sans-serif", fontSize: '3rem', marginRight: '0.5rem'}}>Attendance</span>
            <span style={{paddingTop: 12, textAlign: 'left', fontSize: '1.5rem'}}>
              Replace QR codes and spreadsheets with cryptographic certainty. Soulvenirs bind attendance to a unique, immutable record — ideal for internal access control, limited drops, or community reputation. Frictionless for the user, tamper-proof for you.
            </span>
          </div>
        </div>

        <div style={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '500px', justifyContent: 'center'}}>
            <span style={{fontFamily: "'CoseGrottesche', sans-serif", fontSize: '3rem', marginRight: '0.5rem'}}>Ticketing</span>
            <span style={{paddingTop: 12, textAlign: 'left', fontSize: '1.5rem'}}>
              Forget printable tickets and scalper bots. Soulvenirs act as single-use, soulbound access credentials — fully branded, fully verifiable, and impossible to resell. Ideal for gated events where trust, exclusivity, and identity actually matter.
              <br></br><br></br>Less shilling, more chilling. 😎
            </span>
          </div>
          <HoloCard imageUrl="/pictures/exampleFootball.png" />  
        </div>
       
        <h1 style={{fontSize: '4rem', fontStyle: 'italic'}}>Open Source:</h1>

        <span style={{fontSize: '1.5rem', width: '40%'}}>
          Soulvenir is fully open source — from smart contracts to frontend. Every Soulvenir minted is backed by a soulbound ERC-721 token, using auditable, non-transferable contract logic you can inspect directly on-chain. The entire platform, including this site, lives on GitHub. No black boxes. No hidden logic. Just clean, transparent code you can fork, verify, or build on.
        </span>

        <a className='githubLink' style={{margin: '2rem 0 0 0', fontSize: '2rem', fontFamily: "'CoseGrottesche', sans-serif", cursor: 'pointer'}} href='https://github.com/ssambender/soulvenir' target='_blank'>View on GitHub</a>

      </div>

      <style jsx>{`
        h1 {
          font-size: 8rem;
        }

        @media (orientation: portrait) {
          h1 {
            font-size: 4rem;
          }
        }

        @keyframes carouselLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes carouselRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .githubLink:hover {
          text-decoration: underline;
        }
      `}</style>

      <div style={{position: 'fixed', bottom: 6, left: 4, zIndex: 3}}>
        <Image alt="Barcode" src={'/barcode.png'} width={200} height={100} />
      </div>
    </main>
  );
}

const styles = {
  hero: {
    position: 'relative' as const,
    width: '100%',
    height: '80vh',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'column' as const,
  },
  imageRows: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-evenly',
    padding: '0',
    transform: 'rotateZ(-15deg) scale(1.75)',
  },
  rowContainer: {
    width: '100%',
    padding: '0 2rem',
    overflow: 'visible', // allow shadow to show outside bounds
  },
  rowWrapper: {
    display: 'flex',
    gap: '1.5rem',
    minWidth: 'max-content',
    willChange: 'transform',
  },
  image: {
    objectFit: 'cover' as const,
    borderRadius: '6px',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: 'white',
    zIndex: 1,
    margin: 0,
    fontFamily: "'CoseGrottesche', sans-serif",
    textShadow: '6px 6px 1px rgba(1, 1, 1, 1), 2px 2px 10px rgb(0 0 0 / 1)',
    // textShadow: '2px 2px 10px rgb(0 0 0 / 1)',
  },
  fadeOut: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '150px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)',
    zIndex: 2,
  },
};
