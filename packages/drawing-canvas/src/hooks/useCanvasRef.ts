import { useContext } from "react"
import { CanvasContext } from "../contexts/canvasContext"

export function useCanvasRef() {
  const context = useContext(CanvasContext)

  if (!context) throw new Error("useCanvasRef must be used inside CanvasProvider")

  return context.canvasRef
}
