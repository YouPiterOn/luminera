import type React from "react"
import { createContext, useContext, useRef } from "react"

type CanvasContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}

const CanvasContext = createContext<CanvasContextType | null>(null)

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return <CanvasContext.Provider value={{ canvasRef }}>{children}</CanvasContext.Provider>
}

export function useCanvas() {
  const context = useContext(CanvasContext)

  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider")
  }

  return context.canvasRef
}

