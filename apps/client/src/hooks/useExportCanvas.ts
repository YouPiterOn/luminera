import { useCanvasRef } from "@luminera/drawing-canvas";
import { createDataUrl } from "../utils/canvasUtils";

export function useExportCanvas() {
  const canvasRef = useCanvasRef()

  const exportToPNG = (width: number, height: number, scale: number = 1) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const dataUrl = createDataUrl(canvas, width, height, scale)

    return dataUrl;
  }

  return { exportToPNG }
}
