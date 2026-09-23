'use client';

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';

const FRAME_SRC = '/moldura-cris-milli-30180.png';
const SIZE = 1080;
const FILE_NAME = 'eu-apoio-cris-milli-30180.jpg';

type Offset = { x: number; y: number };

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function FrameMaker({ label = 'Criar minha foto com moldura', className = 'button' }: { label?: string; className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; offset: Offset } | null>(null);
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [error, setError] = useState('');
  const [canShare, setCanShare] = useState(false);

  const clampOffset = useCallback((next: Offset, image: HTMLImageElement, scaleZoom: number): Offset => {
    const scale = Math.max(SIZE / image.width, SIZE / image.height) * scaleZoom;
    const maxX = (image.width * scale - SIZE) / 2;
    const maxY = (image.height * scale - SIZE) / 2;
    return { x: Math.min(maxX, Math.max(-maxX, next.x)), y: Math.min(maxY, Math.max(-maxY, next.y)) };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !photo || !frame) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const scale = Math.max(SIZE / photo.width, SIZE / photo.height) * zoom;
    const width = photo.width * scale;
    const height = photo.height * scale;
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, SIZE, SIZE);
    context.drawImage(photo, (SIZE - width) / 2 + offset.x, (SIZE - height) / 2 + offset.y, width, height);
    context.drawImage(frame, 0, 0, SIZE, SIZE);
  }, [photo, zoom, offset]);

  useEffect(() => {
    if (!photo) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [photo]);

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError('');

    const url = URL.createObjectURL(file);
    try {
      const [image, frame] = await Promise.all([loadImage(url), frameRef.current ?? loadImage(FRAME_SRC)]);
      frameRef.current = frame;
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setPhoto(image);
      const probe = new File([''], FILE_NAME, { type: 'image/jpeg' });
      setCanShare(typeof navigator.canShare === 'function' && navigator.canShare({ files: [probe] }));
    } catch {
      setError('Não foi possível abrir essa imagem. Tente outra foto (JPG ou PNG).');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  function close() {
    setPhoto(null);
  }

  function changeZoom(value: number) {
    if (!photo) return;
    setZoom(value);
    setOffset((current) => clampOffset(current, photo, value));
  }

  function onPointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, offset };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current;
    if (!drag || !photo) return;
    const ratio = SIZE / event.currentTarget.getBoundingClientRect().width;
    setOffset(clampOffset({ x: drag.offset.x + (event.clientX - drag.x) * ratio, y: drag.offset.y + (event.clientY - drag.y) * ratio }, photo, zoom));
  }

  function toBlob() {
    return new Promise<Blob | null>((resolve) => canvasRef.current?.toBlob(resolve, 'image/jpeg', 0.92) ?? resolve(null));
  }

  async function download() {
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = FILE_NAME;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    window.dispatchEvent(new CustomEvent('moldura_download'));
  }

  async function share() {
    const blob = await toBlob();
    if (!blob) return;
    try {
      await navigator.share({ files: [new File([blob], FILE_NAME, { type: 'image/jpeg' })], text: 'Eu apoio Cris Milli 30.180! #EuApoioCrisMilli' });
      window.dispatchEvent(new CustomEvent('moldura_share'));
    } catch {
      // Usuário cancelou o compartilhamento.
    }
  }

  return (
    <>
      <button className={className} type="button" onClick={() => inputRef.current?.click()}>{label}</button>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
      {error && <p className="frame-error" role="alert">{error}</p>}

      {photo && createPortal(
        <div className="frame-modal" role="dialog" aria-modal="true" aria-labelledby="frame-title" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div className="frame-panel">
            <button className="frame-close" type="button" aria-label="Fechar" onClick={close}>×</button>
            <p className="eyebrow">#EuApoioCrisMilli</p>
            <h3 id="frame-title">Sua foto com a moldura</h3>
            <canvas
              ref={canvasRef}
              width={SIZE}
              height={SIZE}
              className="frame-canvas"
              aria-label="Pré-visualização da foto com a moldura"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={() => { dragRef.current = null; }}
              onPointerCancel={() => { dragRef.current = null; }}
            />
            <label className="frame-zoom">
              <span>Zoom</span>
              <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(event) => changeZoom(Number(event.target.value))} />
            </label>
            <p className="frame-hint">Arraste a foto para ajustar a posição.</p>
            <div className="frame-actions">
              <button className="button" type="button" onClick={download}>Baixar foto</button>
              {canShare && <button className="button button-outline" type="button" onClick={share}>Compartilhar</button>}
              <button className="text-button" type="button" onClick={() => inputRef.current?.click()}>Trocar foto</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
