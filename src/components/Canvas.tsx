import { useEffect, useRef, useState } from "react";
import { useCanvasStore } from "../hooks/useCanvasStore";


const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const { size, zoom, pixelScale, color, showGrid, clearCanvas, setClearCanvas } = useCanvasStore();

  const [isDrawing, setIsDrawing] = useState(false);

  // Draws the grid on a separate canvas
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

  // Handles zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const actualWidth = size.width * pixelScale * dpr;
    const actualHeight = size.height * pixelScale * dpr;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = actualWidth;
    canvas.height = actualHeight;
    canvas.style.width = `${size.width * pixelScale}px`;
    canvas.style.height = `${size.height * pixelScale}px`;

    ctx.imageSmoothingEnabled = false;

    ctx.scale(dpr * pixelScale, dpr * pixelScale);
    const drawImage = async () => {
      const newImage = await resizeImageData(imageData, actualWidth, actualHeight);
      if(!newImage) return;
      ctx.putImageData(newImage, 0, 0);
    }

    drawImage();
  }, [zoom]);

  //Handles resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const actualWidth = size.width * pixelScale * dpr;
    const actualHeight = size.height * pixelScale * dpr;

    canvas.width = actualWidth;
    canvas.height = actualHeight;
    canvas.style.width = `${size.width * pixelScale}px`;
    canvas.style.height = `${size.height * pixelScale}px`;

    ctx.imageSmoothingEnabled = false;

    ctx.scale(dpr * pixelScale, dpr * pixelScale);
  }, [size])

  // Clear canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setClearCanvas(false);
  }, [clearCanvas])

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

  let lastX: number | null = null;
  let lastY: number | null = null;

  const drawPixel = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelScale);
    const y = Math.floor((e.clientY - rect.top) / pixelScale);
  
    ctx.fillStyle = color;
  
    // If this is the first point, just draw it
    if (lastX === null || lastY === null) {
      ctx.fillRect(x, y, 1, 1);
    } else {
      // Draw a line between last position and current position
      drawLine(ctx, lastX, lastY, x, y);
    }
  
    // Update last position
    lastX = x;
    lastY = y;
  };

  const drawLine = (ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) => {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
  
    while (true) {
      ctx.fillRect(x0, y0, 1, 1); // Draw pixel
      if (x0 === x1 && y0 === y1) break;
      let e2 = err * 2;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
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

export default Canvas;
