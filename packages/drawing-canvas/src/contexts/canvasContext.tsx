import React from "react"
import { createContext, useRef } from "react"
import { HistoryStore } from "../store/historyStore"
import { CanvasAction } from "../types"

type CanvasContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  history: HistoryStore<CanvasAction>
}

export const CanvasContext = createContext<CanvasContextType | null>(null)

export function CanvasProvider({ children, history }: { children: React.ReactNode, history: HistoryStore<CanvasAction> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return <CanvasContext.Provider value={{ canvasRef, history }}>{children}</CanvasContext.Provider>
}
