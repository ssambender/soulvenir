'use client';

import { useEffect, useRef } from 'react';
import $ from 'jquery';
import '../app/holocard.css';

interface HoloCardProps {
  imageUrl: string;
}

export default function Holocard({ imageUrl }: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const styleTagRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const $card = $(cardRef.current);
    const $style = $('<style class="hover"></style>').appendTo('head');
    styleTagRef.current = $style[0] as HTMLStyleElement;

    const handleMove = (e: any) => {
      let pos = [e.offsetX, e.offsetY];
      e.preventDefault();
      if (e.type === 'touchmove') {
        pos = [e.touches[0].clientX, e.touches[0].clientY];
      }

      const l = pos[0];
      const t = pos[1];
      const h = $card.height()!;
      const w = $card.width()!;
      const px = Math.abs(Math.floor((100 / w) * l) - 100);
      const py = Math.abs(Math.floor((100 / h) * t) - 100);
      const pa = 50 - px + (50 - py);
      const lp = 50 + (px - 50) / 1.5;
      const tp = 50 + (py - 50) / 1.5;
      const px_spark = 50 + (px - 50) / 7;
      const py_spark = 50 + (py - 50) / 7;
      const p_opc = 20 + Math.abs(pa) * 1.5;
      const ty = ((tp - 50) / 2) * -1;
      const tx = ((lp - 50) / 1.5) * 0.5;

      const grad_pos = `background-position: ${lp}% ${tp}%;`;
      const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
      const opc = `opacity: ${p_opc / 100};`;
      const tf = `rotateX(${ty}deg) rotateY(${tx}deg)`;

      const style = `
        .card:hover:before { ${grad_pos} }
        .card:hover:after { ${sprk_pos} ${opc} }
      `;

      $card.removeClass('animated');
      $card.css('transform', tf);
      styleTagRef.current!.innerHTML = style;
      clearTimeout((window as any).holoTimeout);
    };

    const handleOut = () => {
      //$card.removeAttr('style');
      $card.css('transform', '');

      styleTagRef.current!.innerHTML = '';
      (window as any).holoTimeout = setTimeout(() => {
        $card.addClass('animated');
      }, 2500);
    };

    $card.on('mousemove touchmove', handleMove);
    $card.on('mouseout touchend touchcancel', handleOut);

    return () => {
      $card.off('mousemove touchmove', handleMove);
      $card.off('mouseout touchend touchcancel', handleOut);
      $style.remove();
    };
  }, []);


  return (
    <section className="cards">
      <div className="three-d-wrapper">
        <div ref={cardRef} className="card nft animated"   style={{ backgroundImage: `url('${imageUrl}')` }}        />
      </div>
    </section>
  );
}
