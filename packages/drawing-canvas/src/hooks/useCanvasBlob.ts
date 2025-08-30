import { useState, useRef, useCallback } from 'react';

export function useCanvasBlob() {
  const [blob, setBlob] = useState<Blob | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setBlobDebounce = useCallback((canvas: HTMLCanvasElement) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      canvas.toBlob((newBlob) => {
        if (newBlob) setBlob(newBlob);
      }, 'image/png');
    }, 500);
  }, [timeoutRef]);

  return {
    useBlob: () => blob,
    setBlob: setBlobDebounce
  };
}
