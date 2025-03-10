import { create } from "zustand";
import { Brush, BrushType, Size } from "../types/canvas";

interface CanvasState {
  size: Size;
  brush: Brush;
  zoom: number;
  pixelScale: number;
  showGrid: boolean;
  clearCanvas: boolean,
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setSize: (width: number, height: number) => void;
  setBrush: (brush: Brush) => void;
  setZoom: (zoom: number) => void;
  setShowGrid: (isOn: boolean) => void;
  setClearCanvas: (value: boolean) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  size: {
    width: 32,
    height: 32,
  },
  brush: {
    name: BrushType.Pencil,
    size: 1
  },
  zoom: 100,
  pixelScale: 8,
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
  setBrush: (brush) => set({ brush }),
  setZoom: (zoom) =>
    set((state) => {
      const newZoom = Math.max(50, Math.min(zoom, 500));
      return {
        zoom: newZoom,
        pixelScale: Math.round((newZoom / 100) * Math.max(1, 256 / Math.max(state.size.width, state.size.height))),
      }
    }),
  setShowGrid: (isOn) => set(() => ({ showGrid: isOn })),
  setClearCanvas: (value) => set(()=> ({ clearCanvas: value })),
}));