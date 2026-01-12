import type React from "react"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { handleLine, resizeImageData, setupCanvas } from "../utils/canvasUtils"
import { useCanvasParamsStore } from "./useCanvasParamsStore";
import { CanvasContext } from "../contexts/CanvasContext";
import { useCanvasBlob } from "./useCanvasBlob";
import { useCanvasHistory } from "./useCanvasHistory";

export function useCanvasController() {
  const canvasRef = useContext(CanvasContext)?.canvasRef
  
  if (!canvasRef) throw new Error("useCanvasController must be used inside CanvasProvider")
  
  const { width, height, zoom, brushSize, brushHandler, pixelScale, selectedColor, clearCanvas, actions } = useCanvasParamsStore();
  const { setBlob } = useCanvasBlob();
  const [isDrawing, setIsDrawing] = useState(false)
  const lastX = useRef<number | null>(null)
  const lastY = useRef<number | null>(null)
  const history = useCanvasHistory();

  // Handles zoom
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const actualWidth = width * pixelScale * dpr
    const actualHeight = height * pixelScale * dpr

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    canvas.width = actualWidth
    canvas.height = actualHeight
    canvas.style.width = `${width * pixelScale}px`
    canvas.style.height = `${height * pixelScale}px`

    ctx.imageSmoothingEnabled = false

    ctx.scale(dpr * pixelScale, dpr * pixelScale)
    const drawImage = async () => {
      const newImage = await resizeImageData(imageData, actualWidth, actualHeight)
      if (!newImage) return
      ctx.putImageData(newImage, 0, 0)
    }

    drawImage()
  }, [zoom])

  // Handles resizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    setupCanvas(canvas, width, height, pixelScale)
  }, [width, height, pixelScale])

  // Clear canvas
  useEffect(() => {
    if (!clearCanvas) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    history.clear();
    setBlob(canvas);
    actions.setClearCanvas(false)
  }, [clearCanvas])

  const draw = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelScale);
    const y = Math.floor((e.clientY - rect.top) / pixelScale);

    ctx.fillStyle = selectedColor;

    if (lastX.current === null || lastY.current === null) {
      brushHandler(ctx, x, y, brushSize);
    } else {
      handleLine(ctx, lastX.current, lastY.current, x, y, brushSize, brushHandler);
    }

    history.push({
      currentX: x,
      currentY: y,
      lastX: lastX.current,
      lastY: lastY.current,
      brushSize: brushSize,
      brushHandler: brushHandler
    })

    setBlob(canvas);

    lastX.current = x;
    lastY.current = y;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDrawing(true)
    lastX.current = null
    lastY.current = null
    draw(e)
  }, [setIsDrawing, draw]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing) return
    draw(e)
  }, [isDrawing, draw]);

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
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  }
}

