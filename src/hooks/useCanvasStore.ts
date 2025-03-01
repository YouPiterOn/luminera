import { create } from "zustand";

interface CanvasState {
  width: number;
  height: number;
  zoom: number;
  pixelScale: number;
  color: string;
  showGrid: boolean;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setZoom: (zoom: number) => void;
  setColor: (color: string) => void;
  setShowGrid: (isOn: boolean) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  width: 32,
  height: 32,
  zoom: 100, // Default 100% zoom
  pixelScale: 8, // This should adjust based on zoom
  color: "black",
  showGrid: true,
  setWidth: (width) =>
    set((state) => ({
      width,
      pixelScale: Math.round((state.zoom / 100) * Math.max(1, 256 / Math.max(width, state.height))),
    })),
  setHeight: (height) =>
    set((state) => ({
      height,
      pixelScale: Math.round((state.zoom / 100) * Math.max(1, 256 / Math.max(state.width, height))),
    })),
  setZoom: (zoom) =>
    set((state) => ({
      zoom,
      pixelScale: Math.round((zoom / 100) * Math.max(1, 256 / Math.max(state.width, state.height))),
    })),
  setColor: (color) => set(() => ({ color })),
  setShowGrid: (isOn) => set(() => ({ showGrid: isOn }))
}));