import { useEffect, useRef } from "react"
import { drawGrid } from "../utils/canvasUtils"
import type { Size } from "../types/canvas"

export function useGridCanvas(size: Size, pixelScale: number, showGrid: boolean) {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas) return;
    const ctx = gridCanvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    gridCanvas.width = size.width * pixelScale * dpr;
    gridCanvas.height = size.height * pixelScale * dpr;
    gridCanvas.style.width = `${size.width * pixelScale}px`;
    gridCanvas.style.height = `${size.height * pixelScale}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

    if (showGrid) {
      drawGrid(ctx, size.width, size.height, pixelScale);
    }
  }, [size, pixelScale, showGrid]);

  return gridCanvasRef
}
