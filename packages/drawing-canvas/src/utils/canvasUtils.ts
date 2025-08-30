import { BrushHandler } from "../types";

export function handleLine(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  brushSize: number,
  handler: BrushHandler
) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    handler(ctx, x0, y0, brushSize);
    if (x0 === x1 && y0 === y1) break;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

export function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, pixelScale: number) {
  const gridColor = "rgba(0, 0, 0, 0.2)"
  ctx.strokeStyle = gridColor
  ctx.lineWidth = 0.5

  for (let x = 0; x <= width; x++) {
    ctx.beginPath()
    ctx.moveTo(x * pixelScale, 0)
    ctx.lineTo(x * pixelScale, height * pixelScale)
    ctx.stroke()
  }

  for (let y = 0; y <= height; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * pixelScale)
    ctx.lineTo(width * pixelScale, y * pixelScale)
    ctx.stroke()
  }
}

export async function resizeImageData(imageData: ImageData, width: number, height: number) {
  const resizeWidth = Math.floor(width)
  const resizeHeight = Math.floor(height)

  const canvas = document.createElement("canvas")
  canvas.width = resizeWidth
  canvas.height = resizeHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.imageSmoothingEnabled = false

  const tempCanvas = document.createElement("canvas")
  tempCanvas.width = imageData.width
  tempCanvas.height = imageData.height
  const tempCtx = tempCanvas.getContext("2d")
  if (!tempCtx) return null
  tempCtx.putImageData(imageData, 0, 0)

  ctx.drawImage(tempCanvas, 0, 0, resizeWidth, resizeHeight)

  return ctx.getImageData(0, 0, resizeWidth, resizeHeight)
}

export function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const dpr = window.devicePixelRatio || 1
  const actualWidth = width * pixelScale * dpr
  const actualHeight = height * pixelScale * dpr

  canvas.width = actualWidth
  canvas.height = actualHeight
  canvas.style.width = `${width * pixelScale}px`
  canvas.style.height = `${height * pixelScale}px`

  ctx.imageSmoothingEnabled = false
  ctx.scale(dpr * pixelScale, dpr * pixelScale)

  return ctx
}

export function createDataUrl(
  sourceCanvas: HTMLCanvasElement,
  pixelWidth: number,
  pixelHeight: number,
  scale: number = 1
) {
  const outputWidth = Math.floor(pixelWidth * scale)
  const outputHeight = Math.floor(pixelHeight * scale)

  const canvas = document.createElement("canvas")
  canvas.width = outputWidth
  canvas.height = outputHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.imageSmoothingEnabled = false

  ctx.drawImage(sourceCanvas, 0, 0, outputWidth, outputHeight)

  return canvas.toDataURL("image/png");
}

export function createEmptyDataUrl(width: number, height: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context could not be created.");
  }

  ctx.clearRect(0, 0, width, height);

  return canvas.toDataURL("image/png");
}