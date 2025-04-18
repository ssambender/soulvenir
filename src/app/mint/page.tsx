'use client';

import React, { useState } from 'react';
import { HolocardGenerator } from '@/components/HolocardGenerator';

const inputStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '16px',
  color: 'black',
  minWidth: '400px',
};

export default function MintPage() {
  // Form input states
  const [eventName, setEventName] = useState('Vespa Club');
  const [eventName2, setEventName2] = useState('Meetup');
  const [organizerName, setOrganizerName] = useState('Keystone Moto Club');
  const [eventDate, setEventDate] = useState('2025-06-17');
  const [sealColor, setSealColor] = useState<'' | 'bronze' | 'silver' | 'gold'>('gold');
  const [stars, setStars] = useState(3);
  const [attendeeNum, setAttendeeNum] = useState('000003');
  const [editionNum, setEditionNum] = useState('000123');
  const [cardNum, setCardNum] = useState('0150');
  const [hashAddress, setHashAddress] = useState('0xLX150CCEF4560xABC123DEF4560xABC12F...');
  const [bgImage, setBgImage] = useState('VespaVert.png');
  const [duotoneStyle, setDuotoneStyle] = useState('none');
  const [bgImageError, setBgImageError] = useState(false);

  // Committed preview state (only updates on Generate)
  const [previewProps, setPreviewProps] = useState<any | null>(null);

  return (
    <main style={styles.body}>
      <h1 style={{ fontSize: '3rem', marginTop: '3rem', fontFamily: "'CoseGrottesche', sans-serif" }}>
        Create a Soulvenir:
      </h1>

      <div style={styles.row}>
        {/* Form */}
        <div className="controlContainer" style={styles.controlContainer}>
          <input type="text" placeholder="Event Name" style={inputStyle} value={eventName} onChange={e => setEventName(e.target.value)} />
          <input type="text" placeholder="Event Name Line 2" style={inputStyle} value={eventName2} onChange={e => setEventName2(e.target.value)} />
          <input type="text" placeholder="Organizer/Company Name" style={inputStyle} value={organizerName} onChange={e => setOrganizerName(e.target.value)} />
          <input type="date" placeholder="Event Date" style={inputStyle} value={eventDate} onChange={e => setEventDate(e.target.value)} />
          
          <select style={inputStyle} value={sealColor} onChange={e => setSealColor(e.target.value as any)}>
            <option value="">No Seal</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select>

          <input type="number" placeholder="# of Stars" min="0" max="5" value={stars} style={inputStyle} onChange={e => setStars(Number(e.target.value))} />
          <input type="text" placeholder="Attendee Number" maxLength={9} value={attendeeNum} style={inputStyle} onChange={e => setAttendeeNum(e.target.value)} />
          <input type="text" placeholder="Soulvenir Series #" value={editionNum} style={inputStyle} onChange={e => setEditionNum(e.target.value)} />
          <input type="text" placeholder="Card #" maxLength={12} value={cardNum} style={inputStyle} onChange={e => setCardNum(e.target.value)} />
          <input type="text" placeholder="Hash Address" value={hashAddress} style={inputStyle} onChange={e => setHashAddress(e.target.value)} />
          
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <label htmlFor="imageLinkInput">Image URL:</label>
            <a href='https://pinata.cloud/ipfs' target='_blank' style={{textDecoration: 'underline'}} className="pinataLink">Suggested IPFS hosting: Pinata</a>
          </div>
          <input
            id="imageLinkInput"
            type="text"
            placeholder="IPFS URL (Image)"
            value={bgImage}
            style={inputStyle}
            onChange={e => {
              setBgImage(e.target.value);
              setBgImageError(false); // reset error until checked again
            }}
          />

          {/* CORS check logic */}
          {bgImage && (
            <img
              src={bgImage}
              style={{ display: 'none' }}
              onLoad={() => setBgImageError(false)}
              onError={() => setBgImageError(true)}
              crossOrigin="anonymous"
            />
          )}

          {bgImage && bgImageError && (
            <span style={{ color: '#ff6666', fontSize: '14px' }}>
              ⚠️ Image will not work (CORS or bad URL)
            </span>
          )}

          <label htmlFor="duotoneStyle">Image Filter:</label>
          <select id="duotoneStyle" style={inputStyle} value={duotoneStyle} onChange={e => setDuotoneStyle(e.target.value)}>
            <option value="none">None</option>
            <option value="red">Red</option>
            <option value="redyellow">Amber</option>
            <option value="green">Green</option>
            <option value="blue">Cyan</option>
            <option value="bluered">Blue/Red</option>
            <option value="purple">Magenta</option>
            <option value="bluegreen">Blue/Green Inverse</option>
            <option value="bluepurple">Plum</option>
            <option value="thermal">Thermal</option>
            <option value="bubblegum">Bubblegum</option>
            <option value="gray">Gray</option>
          </select>

          <button
            onClick={() => {
              const [year, month, day] = eventDate.split('-');
              const formattedDate = `${month}/${day}/${year}`;

              setPreviewProps({
                eventName,
                eventName2,
                organizerName,
                eventDate: formattedDate,
                sealColor,
                stars,
                attendeeNum,
                editionNum,
                cardNum,
                hashAddress,
                bgImage,
                duotoneStyle,
              });
            }}
            className="generateButton"
          >
            Preview Card
          </button>

          <style jsx>{`
            .generateButton {
              background-color: white;
              padding: 10px;
              border-radius: 6px;
              border: none;
              font-size: 16px;
              color: black;
              min-width: 400px;
              cursor: pointer;
              transition: background-color 0.2s ease, color 0.2s ease;
            }

            .generateButton:hover {
              background-color:rgb(125, 111, 219);
              color: white;
            }

            .pinataLink {
              transition: 0.1s ease;
            }
            .pinataLink:hover {
              color: #4DE5A6;
            }
          `}</style>
        </div>

        {/* Live Preview (only updates on Generate button click) */}
        <div style={{ marginLeft: '2rem', transform: 'scale(0.75)', transformOrigin: 'top left' }}>
          {previewProps && <HolocardGenerator {...previewProps} />}
        </div>
      </div>

      <p style={{ padding: 20, maxWidth: 900, backgroundColor: 'black', color: 'white', borderRadius: '10px' }}>
        When connected to Metamask, organizers will be able to mint soulbound NFTs here and set up distribution.
        This UI is a prototype. Design is subject to change as blockchain integration is finalized.
      </p>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    marginTop: '2rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  controlContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: 'white',
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '40px',
  },
};
