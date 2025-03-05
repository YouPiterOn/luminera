import { useCanvasStore } from "../hooks/useCanvasStore"
import { useDrawingCanvas } from "../hooks/useDrawingCanvas"
import { useGridCanvas } from "../hooks/useGridCanvas"

const Canvas = () => {
  const { size, zoom, pixelScale, color, showGrid, clearCanvas, setClearCanvas } = useCanvasStore()

  const gridCanvasRef = useGridCanvas(size, pixelScale, showGrid)

  const { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useDrawingCanvas(
    size,
    pixelScale,
    zoom,
    color,
    clearCanvas,
    setClearCanvas,
  )

  return (
    <div className="relative">
      <canvas ref={gridCanvasRef} className="absolute border-2 border-transparent top-0 left-0 pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="border-2 border-cloudy-400 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        
      />
    </div>
  )
}

export default Canvas
