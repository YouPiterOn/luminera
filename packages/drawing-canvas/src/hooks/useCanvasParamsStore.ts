import { create } from "zustand";
import { BrushHandler } from "../types";
import { useShallow } from "zustand/shallow";

interface CanvasParamsState {
  width: number;
  height: number;
  brushSize: number;
  brushHandler: BrushHandler;
  zoom: number;
  pixelScale: number;
  selectedColor: string;
  showGrid: boolean;
  clearCanvas: boolean,
  actions: {
    setSize: (width: number, height: number) => void,
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setBrushSize: (size: number) => void;
    setBrushHandler: (handler: BrushHandler) => void;
    setZoom: (zoom: number) => void;
    setSelectedColor: (color: string) => void;
    setShowGrid: (isOn: boolean) => void;
    setClearCanvas: (value: boolean) => void;
  }
}

export const useCanvasParamsStore = create<CanvasParamsState>((set) => ({
  width: 32,
  height: 32,
  brushSize: 1,
  brushHandler: (ctx: CanvasRenderingContext2D, x: number, y: number, brushSize: number) => {
    ctx.fillRect(x - brushSize + 1, y - brushSize + 1, brushSize * 2 - 1, brushSize * 2 - 1);
  },
  zoom: 100,
  pixelScale: 8,
  selectedColor: '#000000',
  showGrid: true,
  clearCanvas: false,
  actions: {
    setSize: (width, height) => set({ width, height }),
    setWidth: (width) =>
      set((state) => ({
        width: width,
        pixelScale: Math.round((state.zoom / 100) * Math.max(1, 256 / Math.max(width, state.height))),
      })),
    setHeight: (height) =>
      set((state) => ({
        height: height,
        pixelScale: Math.round((state.zoom / 100) * Math.max(1, 256 / Math.max(state.width, height))),
      })),
    setBrushSize: (size) => set({ brushSize: size }),
    setBrushHandler: (handler) => set({ brushHandler: handler }),
    setZoom: (zoom) =>
      set((state) => {
        const newZoom = Math.max(50, Math.min(zoom, 500));
        return {
          zoom: newZoom,
          pixelScale: Math.round((newZoom / 100) * Math.max(1, 256 / Math.max(state.width, state.height))),
        }
      }),
    setSelectedColor: (color) => set({ selectedColor: color }),
    setShowGrid: (isOn) => set(() => ({ showGrid: isOn })),
    setClearCanvas: (value) => set(() => ({ clearCanvas: value })),
  }
}));

export const useCanvasParamsActions = () => useCanvasParamsStore((state) => state.actions)

export const useCanvasSize = () => useCanvasParamsStore(useShallow((state) => ({
  width: state.width,
  height: state.height
})));