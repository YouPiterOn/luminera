import { create } from "zustand";

interface CanvasState {
  size: {
    width: number;
    height: number;
  }
  zoom: number;
  pixelScale: number;
  color: string;
  showGrid: boolean;
  clearCanvas: boolean,
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setSize: (width: number, height: number) => void;
  setZoom: (zoom: number) => void;
  setColor: (color: string) => void;
  setShowGrid: (isOn: boolean) => void;
  setClearCanvas: (value: boolean) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  size: {
    width: 32,
    height: 32,
  },
  zoom: 100,
  pixelScale: 8,
  color: "black",
  showGrid: true,
  clearCanvas: false,
  setWidth: (width) =>
    set((state) => ({
      size: { width, height: state.size.height },
      pixelScale: Math.round((state.zoom / 100) * Math.max(1, 256 / Math.max(width, state.size.height))),
    })),
  setHeight: (height) =>
    set((state) => ({
      size: { width: state.size.width, height },
      pixelScale: Math.round((state.zoom / 100) * Math.max(1, 256 / Math.max(state.size.width, height))),
    })),
  setSize: (width, height) => 
    set((state) => ({
      size: {width, height},
      pixelScale: Math.round((state.zoom / 100) * Math.max(1, 256 / Math.max(width, height)))
    })),
  setZoom: (zoom) =>
    set((state) => ({
      zoom,
      pixelScale: Math.round((zoom / 100) * Math.max(1, 256 / Math.max(state.size.width, state.size.height))),
    })),
  setColor: (color) => set(() => ({ color })),
  setShowGrid: (isOn) => set(() => ({ showGrid: isOn })),
  setClearCanvas: (value) => set(()=> ({ clearCanvas: value })),
}));