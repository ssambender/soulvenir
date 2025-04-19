'use client';

import HoloCard from '@/components/Holocard';
import { HolocardGenerator } from '@/components/HolocardGenerator';

export default function WalletPage() {
  return (
    <main>
      <style jsx>{`
        .card-container {
          display: flex;
          gap: 2rem;
          justify-content: center;
          padding: 8rem 0 2rem 0;
          flex-wrap: wrap;
        }

        @media (orientation: portrait) {
          .card-container {
            flex-direction: column;
            align-items: center;
            padding: 4rem 0 2rem 0;
          }
        }
      `}</style>

      <div className="card-container">
        <HolocardGenerator
          eventName="Vespa Club"
          eventName2="Meetup"
          organizerName="Keystone Moto Club"
          eventDate="06/17/2025"
          sealColor="gold"
          stars={3}
          attendeeNum="000003"
          editionNum="000123"
          cardNum="0150"
          hashAddress="0xLX150CCEF4560xABC123DEF4560xABC12F..."
          bgImage="/VespaVert.png"
          duotoneStyle="none"
        />

        <HolocardGenerator
          eventName="Raccoon"
          eventName2="Cowboy"
          organizerName="CryptoAnimals™"
          eventDate="09/04/2019"
          sealColor=""
          stars={1}
          attendeeNum="0808"
          editionNum="000123"
          cardNum="0007"
          hashAddress="0xRAC123RAF45RAx0RACCOWBOY560xABC12F..."
          bgImage="/RacoonCowboy.png"
          duotoneStyle="gray"
        />

        <HolocardGenerator
          eventName="Doggy"
          eventName2="Style"
          organizerName="@doggystylepsu"
          eventDate="08/18/2023"
          sealColor="silver"
          stars={0}
          attendeeNum="D066Y"
          editionNum="000123"
          cardNum="0667"
          hashAddress="0xABDOG3DGFYST0xABCYLEDEF4560xABC12F..."
          bgImage="https://ssambender.github.io/portfolio/Main%20Graphic%20BG.png"
          duotoneStyle="none"
        />

        <HolocardGenerator
          eventName="SAM RESUME"
          eventName2="[VHS TAPE]"
          organizerName="Sam Bender 2024"
          eventDate="11/26/2024"
          sealColor="bronze"
          stars={4}
          attendeeNum="04:45"
          editionNum="000123"
          cardNum="0150"
          hashAddress="0xVHS123DIS4560xNEY123DEF4560xABC12F..."
          bgImage="https://ssambender.github.io/portfolio/vhs-render.png"
          duotoneStyle="none"
        />
      </div>
    </main>
  );
}
