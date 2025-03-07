import type React from "react"

import { useEffect, useRef, useState } from "react"
import { drawLine, resizeImageData, setupCanvas } from "../utils/canvasUtils"
import { Size } from "../types/canvas"
import { useCanvas } from "../context/CanvasContext";

export function useDrawingCanvas(
  size: Size,
  pixelScale: number,
  zoom: number,
  color: string,
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true)
    lastX.current = null
    lastY.current = null
    drawPixel(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return
    drawPixel(e)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    lastX.current = null
    lastY.current = null
  }

  const handleMouseLeave = () => {
    setIsDrawing(false)
    lastX.current = null
    lastY.current = null
  }

  const drawPixel = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / pixelScale)
    const y = Math.floor((e.clientY - rect.top) / pixelScale)

    ctx.fillStyle = color

    // If this is the first point, just draw it
    if (lastX.current === null || lastY.current === null) {
      ctx.fillRect(x, y, 1, 1)
    } else {
      // Draw a line between last position and current position
      drawLine(ctx, lastX.current, lastY.current, x, y)
    }

    // Update last position
    lastX.current = x
    lastY.current = y
  }

  return {
    isDrawing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  }
}

