import { useEffect, useRef, useState } from "react";
import { useCanvasStore } from "../hooks/useCanvasStore";

async function resizeImageData(imageData: ImageData, width: number, height: number) {
  const resizeWidth = Math.floor(width);
  const resizeHeight = Math.floor(height);

  const canvas = document.createElement("canvas");
  canvas.width = resizeWidth;
  canvas.height = resizeHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.imageSmoothingEnabled = false;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) return null;
  tempCtx.putImageData(imageData, 0, 0);

  ctx.drawImage(tempCanvas, 0, 0, resizeWidth, resizeHeight);

  return ctx.getImageData(0, 0, resizeWidth, resizeHeight);
}


const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height, pixelScale, color, showGrid } = useCanvasStore();

  const [isDrawing, setIsDrawing] = useState(false);


  // Draws the grid on a separate canvas
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

  // Handles drawing on the main canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const actualWidth = width * pixelScale * dpr;
    const actualHeight = height * pixelScale * dpr;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = actualWidth;
    canvas.height = actualHeight;
    canvas.style.width = `${width * pixelScale}px`;
    canvas.style.height = `${height * pixelScale}px`;

    ctx.imageSmoothingEnabled = false;

    ctx.scale(dpr * pixelScale, dpr * pixelScale);
    const drawImage = async () => {
      const newImage = await resizeImageData(imageData, actualWidth, actualHeight);
      if(!newImage) return;
      ctx.putImageData(newImage, 0, 0);
    }

    drawImage();
  }, [width, height, pixelScale]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    drawPixel(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    drawPixel(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawPixel = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelScale);
    const y = Math.floor((e.clientY - rect.top) / pixelScale);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, pixelScale: number) => {
    const gridColor = "rgba(0, 0, 0, 0.2)";
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * pixelScale, 0);
      ctx.lineTo(x * pixelScale, height * pixelScale);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * pixelScale);
      ctx.lineTo(width * pixelScale, y * pixelScale);
      ctx.stroke();
    }
  };

  return (
    <div className="relative">
      {/* Grid Canvas (z-index: 1) */}
      <canvas
        ref={gridCanvasRef}
        className="absolute border-2 border-transparent top-0 left-0 pointer-events-none"
      />
      
      {/* Drawing Canvas (z-index: 2) */}
      <canvas
        ref={canvasRef}
        className="border-2 border-cloudy-400 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Canvas;
