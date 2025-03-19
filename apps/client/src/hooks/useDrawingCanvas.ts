import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { clear, clearLine, draw, drawLine, resizeImageData, setupCanvas } from "../utils/canvasUtils"
import { Brush, BrushType, Size } from "../types/canvas"
import { useCanvas } from "../context/CanvasContext";

export function useDrawingCanvas(
  size: Size,
  brush: Brush,
  pixelScale: number,
  zoom: number,
  selectedColor: string,
  clearCanvas: boolean,
  setClearCanvas: (value: boolean) => void,
) {
  const canvasRef = useCanvas();
  const [isDrawing, setIsDrawing] = useState(false)
  const lastX = useRef<number | null>(null)
  const lastY = useRef<number | null>(null)

  // Handles zoom
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const actualWidth = size.width * pixelScale * dpr
    const actualHeight = size.height * pixelScale * dpr

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    canvas.width = actualWidth
    canvas.height = actualHeight
    canvas.style.width = `${size.width * pixelScale}px`
    canvas.style.height = `${size.height * pixelScale}px`

    ctx.imageSmoothingEnabled = false

    ctx.scale(dpr * pixelScale, dpr * pixelScale)
    const drawImage = async () => {
      const newImage = await resizeImageData(imageData, actualWidth, actualHeight)
      if (!newImage) return
      ctx.putImageData(newImage, 0, 0)
    }

    drawImage()
  }, [canvasRef, zoom])

  // Handles resizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    setupCanvas(canvas, size.width, size.height, pixelScale)
  }, [canvasRef, size, pixelScale])

  // Clear canvas
  useEffect(() => {
    if (!clearCanvas) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setClearCanvas(false)
  }, [canvasRef, clearCanvas])

  const drawPixel = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelScale);
    const y = Math.floor((e.clientY - rect.top) / pixelScale);

    ctx.fillStyle = selectedColor;

    if (brush.name === BrushType.Fill) {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (brush.name === BrushType.Eraser) {
      if (lastX.current === null || lastY.current === null) {
        clear(ctx, x, y, brush.size);
      } else {
        clearLine(ctx, lastX.current, lastY.current, x, y, brush.size);
      }
    } else if (brush.name === BrushType.Pencil) {
      if (lastX.current === null || lastY.current === null) {
        draw(ctx, x, y, brush.size);
      } else {
        drawLine(ctx, lastX.current, lastY.current, x, y, brush.size);
      }
    }

    lastX.current = x;
    lastY.current = y;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDrawing(true)
    lastX.current = null
    lastY.current = null
    drawPixel(e)
  }, [setIsDrawing, drawPixel]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing) return
    drawPixel(e)
  }, [isDrawing, drawPixel]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false)
    lastX.current = null
    lastY.current = null
  }, [setIsDrawing]);

  const handleMouseLeave = useCallback(() => {
    setIsDrawing(false)
    lastX.current = null
    lastY.current = null
  }, [setIsDrawing]);

  return {
    isDrawing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  }
}

