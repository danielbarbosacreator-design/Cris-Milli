'use client';

import { useState, type CSSProperties } from 'react';

type GalleryItem = {
  image: { src: string; alt?: string };
};

type ArchGalleryProps = {
  items?: GalleryItem[];
  cardWidth?: number;
  cardHeight?: number;
  cornerRadius?: number;
  className?: string;
};

const DEFAULT_ITEMS: GalleryItem[] = [
  { image: { src: '', alt: 'Foto autorizada da campanha 1' } },
  { image: { src: '', alt: 'Foto autorizada da campanha 2' } },
  { image: { src: '', alt: 'Foto autorizada da campanha 3' } },
  { image: { src: '', alt: 'Foto autorizada da campanha 4' } },
  { image: { src: '', alt: 'Foto autorizada da campanha 5' } },
  { image: { src: '', alt: 'Foto autorizada da campanha 6' } },
  { image: { src: '', alt: 'Foto autorizada da campanha 7' } },
];

const ROTATE_STEP = 6;
const Y_STEP = 18;
const OVERLAP = 0.58;
const HOVER_SCALE = 1.08;
const HOVER_LIFT = 16;

export function ArchGallery({
  items = DEFAULT_ITEMS,
  cardWidth = 180,
  cardHeight = 240,
  cornerRadius = 18,
  className = '',
}: ArchGalleryProps) {
  const deck = items.length ? items : DEFAULT_ITEMS;
  const total = deck.length;
  const mid = (total - 1) / 2;
  const [hovered, setHovered] = useState<number | null>(null);

  const stageWidth = cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
  const stageHeight = cardHeight + Math.abs(mid) * Y_STEP + 48;

  return (
    <div
      className={['gallery-shell flex w-full items-center justify-center py-10', className]
        .filter(Boolean)
        .join(' ')}
      role='group'
      aria-label='Galeria de fotos da campanha'
    >
      <div className='relative gallery-stage' style={{ width: stageWidth, height: stageHeight }}>
        {deck.map((entry, index) => {
          const offset = index - mid;
          const rotate = offset * ROTATE_STEP;
          const translateY = Math.abs(offset) * Y_STEP;
          const translateX = offset * cardWidth * OVERLAP;
          const baseZ = total - Math.abs(offset);
          const isHovered = hovered === index;

          const cardStyle: CSSProperties = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: cardWidth,
            height: cardHeight,
            marginLeft: -cardWidth / 2,
            marginTop: -cardHeight / 2,
            borderRadius: cornerRadius,
            overflow: 'hidden',
            transformOrigin: 'center center',
            transform: isHovered
              ? `translate(${translateX}px, ${translateY - HOVER_LIFT}px) rotate(0deg) scale(${HOVER_SCALE})`
              : `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(1)`,
            zIndex: isHovered ? total + 1 : baseZ,
            transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0ms',
            boxShadow: '0 12px 28px rgba(3,53,105,0.20), 0 2px 8px rgba(3,53,105,0.12)',
            cursor: 'pointer',
            backgroundColor: '#edf3f9',
          };

          return (
            <div
              key={`${entry.image.src || 'placeholder'}-${index}`}
              className='gallery-card'
              style={cardStyle}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              aria-label={entry.image.alt || `Foto ${index + 1}`}
            >
              {entry.image.src ? (
                <img
                  src={entry.image.src}
                  alt={entry.image.alt || ''}
                  draggable={false}
                  className='pointer-events-none absolute inset-0 h-full w-full select-none object-cover'
                />
              ) : (
                <div className='gallery-placeholder'>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>Foto autorizada</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
