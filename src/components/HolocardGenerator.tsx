'use client';

import React, { useEffect, useRef, useState } from "react";
import HoloCard from "@/components/Holocard";

interface HolocardGeneratorProps {
  eventName: string;      // 10 chars long
  eventName2: string;     // 11 chars long
  organizerName: string;  // 24 chars long
  eventDate: string;
  sealColor: "" | "bronze" | "silver" | "gold";
  stars: number;
  attendeeNum: string | number;
  editionNum: string | number;
  cardNum: string | number;
  hashAddress: string;
  bgImage: string;
  duotoneStyle?: keyof typeof DUOTONE_PRESETS;
}

const CANVAS_WIDTH = 1272;
const CANVAS_HEIGHT = 1760;

const DUOTONE_PRESETS = {
  none: null,
  red: ['#3d0000', '#ff3c3c'],
  redyellow: ['#a30000', '#feb42a'],
  blue: ['#062b62', '#41e7ff'],
  bluered: ['#004491', '#f95353'],
  green: ['#06360d', '#59dc3f'],
  bluegreen: ['#00ff40', '#0033ff'],
  purple: ['#3c005c', '#f872f4'],
  bluepurple: ['#690896', '#55bfec'],
  thermal: ['#c51ee6', '#fbff00'],
  bubblegum: ['#ff00ae', '#feb4fb'],
  gray: ['#242424', '#e3e3e3'],
};

function applyDuotoneToCanvas(canvas: HTMLCanvasElement, shadow: string, highlight: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const rgb1 = hexToRgb(shadow);
  const rgb2 = hexToRgb(highlight);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    data[i]     = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * lum);
    data[i + 1] = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * lum);
    data[i + 2] = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * lum);
  }

  ctx.putImageData(imageData, 0, 0);
}

export const HolocardGenerator: React.FC<HolocardGeneratorProps> = ({
  eventName,
  eventName2,
  organizerName,
  eventDate,
  sealColor,
  stars,
  attendeeNum,
  editionNum,
  cardNum,
  hashAddress,
  bgImage,
  duotoneStyle = 'none',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const font = new FontFace("EHSMB", "url(/fonts/EHSMB.ttf)");
    font.load().then((loaded) => {
      document.fonts.add(loaded);
    });
  }, []);

  useEffect(() => {
    const drawCard = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      await document.fonts.ready;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const bg = new Image();
      bg.crossOrigin = "anonymous";
      bg.src = bgImage;

      await new Promise<void>((resolve) => {
        bg.onload = () => resolve();
        bg.onerror = () => resolve();
      });

      const targetW = 1162, targetH = 1230, targetX = 55, targetY = 33;
      if (bg.width && bg.height) {
        const scale = Math.max(targetW / bg.width, targetH / bg.height);
        const scaledW = bg.width * scale;
        const scaledH = bg.height * scale;
        const offsetX = (scaledW - targetW) / 2;
        const offsetY = (scaledH - targetH) / 2;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = bg.width;
        tempCanvas.height = bg.height;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
          tempCtx.drawImage(bg, 0, 0);

          const preset = DUOTONE_PRESETS[duotoneStyle];
          if (preset) {
            applyDuotoneToCanvas(tempCanvas, preset[0], preset[1]);
          }

          const cropCanvas = document.createElement("canvas");
          cropCanvas.width = targetW;
          cropCanvas.height = targetH;
          const cropCtx = cropCanvas.getContext("2d");
          if (cropCtx) {
            cropCtx.drawImage(tempCanvas, -offsetX, -offsetY, scaledW, scaledH);
            ctx.drawImage(cropCanvas, targetX, targetY, targetW, targetH);
          }
        }
      }

      // Overlay
      const overlay = new Image();
      overlay.src = "/generator/cardOverlay.png";
      await new Promise<void>((resolve) => {
        overlay.onload = () => {
          ctx.drawImage(overlay, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          resolve();
        };
        overlay.onerror = () => resolve();
      });

      // Seal
      if (sealColor) {
        const seal = new Image();
        seal.src = `/generator/${sealColor}Seal.png`;
        await new Promise<void>((resolve) => {
          seal.onload = () => {
            ctx.drawImage(seal, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            resolve();
          };
          seal.onerror = () => resolve();
        });
      }

      // Stars
      const star = new Image();
      star.src = "/generator/starOverlay.png";
      await new Promise<void>((resolve) => {
        star.onload = () => {
          const count = Math.min(5, Math.max(0, stars));
          const startX = CANVAS_WIDTH - star.width - 100;
          const startY = 74;
          for (let i = 0; i < count; i++) {
            ctx.drawImage(star, startX, startY + i * (star.height + 10));
          }
          resolve();
        };
        star.onerror = () => resolve();
      });

      // Text
      ctx.font = "94px Consolas";
      ctx.font = "94px EHSMB";
      ctx.fillStyle = "black";
      ctx.fillText(eventName, 43, 1330);
      ctx.fillText(eventName2, 43, 1440);

      ctx.font = "48px Consolas";
      ctx.fillText(organizerName, 43, 1526);

      const dateText = eventDate;
      const dateX = (CANVAS_WIDTH / 2 - ctx.measureText(dateText).width / 2) + 352;
      ctx.fillText(dateText, dateX, 1624);

      const attendeeText = String(attendeeNum);
      ctx.font = "72px Consolas";
      ctx.font = "72px EHSMB";
      ctx.fillStyle = "black";
      const attendeeMetrics = ctx.measureText(attendeeText);
      const attendeeX = (CANVAS_WIDTH / 2 - attendeeMetrics.width / 2) + 352;
      ctx.fillRect(attendeeX - 36, 1402 - 36, attendeeMetrics.width + 72, 144);
      ctx.fillStyle = "white";
      ctx.fillText(attendeeText, attendeeX, 1468);

      ctx.font = "24px Consolas";
      ctx.fillStyle = "white";
      ctx.fillText(`#${editionNum}`, 263, 90);

      const cardText = String(cardNum);
      ctx.font = "48px Consolas";
      ctx.fillStyle = "white";
      const cardX = (CANVAS_WIDTH / 2 - ctx.measureText(cardText).width / 2) + 352;
      ctx.fillRect(cardX - 10, 1264, ctx.measureText(cardText).width + 20, 50);
      ctx.fillStyle = "black";
      ctx.fillText(cardText, cardX, 1312);

      ctx.font = "24px Consolas";
      ctx.fillStyle = "black";
      ctx.fillText(hashAddress, 735, 1745);

      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl);
    };

    drawCard();
  }, [
    eventName,
    eventName2,
    organizerName,
    eventDate,
    sealColor,
    stars,
    attendeeNum,
    editionNum,
    cardNum,
    hashAddress,
    bgImage,
    duotoneStyle,
  ]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ display: "none" }}
      />
      {imageUrl && <HoloCard imageUrl={imageUrl} />}
    </>
  );
};
