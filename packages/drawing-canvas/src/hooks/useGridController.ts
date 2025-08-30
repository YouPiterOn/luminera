import { useEffect, useRef } from "react"
import { drawGrid } from "../utils/canvasUtils"
import { useShallow } from 'zustand/shallow'
import { useCanvasParamsStore } from "./useCanvasParamsStore"

export function useGridController() {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height, pixelScale, showGrid } = useCanvasParamsStore(
    useShallow((state) => ({
      width: state.width,
      height: state.height,
      pixelScale: state.pixelScale,
      showGrid: state.showGrid,
    }))
  );

  useEffect(() => {
    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas) return;
    const ctx = gridCanvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    gridCanvas.width = width * pixelScale * dpr;
    gridCanvas.height = height * pixelScale * dpr;
    gridCanvas.style.width = `${width * pixelScale}px`;
    gridCanvas.style.height = `${height * pixelScale}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

    if (showGrid) {
      drawGrid(ctx, width, height, pixelScale);
    }
  }, [width, height, pixelScale, showGrid]);

  return gridCanvasRef
}
