import { useCanvasController } from "../hooks/useCanvasController";
import { useGridController } from "../hooks/useGridController";
import '../styles.css'

export const DrawingCanvas = () => {

  const gridRef = useGridController()

  const { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useCanvasController()

  return (
    <div className="drawing-canvas-container">
      <canvas ref={gridRef} className="drawing-canvas-grid" />
      <canvas
        ref={canvasRef}
        className="drawing-canvas-main"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
