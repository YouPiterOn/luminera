import React from "react"
import { createContext, useRef } from "react"

type CanvasContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}

export const CanvasContext = createContext<CanvasContextType | null>(null)

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return <CanvasContext.Provider value={{ canvasRef }}>{children}</CanvasContext.Provider>
}
