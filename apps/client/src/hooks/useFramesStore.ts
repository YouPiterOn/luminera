import { create } from "zustand";
import { Frame } from "../types/canvas";
import { createEmptyDataUrl } from "../utils/canvasUtils";

interface FramesState {
  frames: Frame[];
  selectedFrameIndex: number;
  addFrame: (frame: Frame) => void;
  setSelectedFrame: (index: number) => void;
  removeFrame: (index: number) => void;
  setFrameDataUrl: (index: number, dataUrl: string) => void;
  clearFrames: () => void;
}
export const useFramesStore = create<FramesState>((set) => ({
  frames: [{ dataUrl: createEmptyDataUrl(1, 1), length: 1 }],
  selectedFrameIndex: 0,
  
  addFrame: (frame) => set((state) => ({ frames: [...state.frames, frame], selectedFrameIndex: state.frames.length })),
  
  setSelectedFrame: (index) => set({ selectedFrameIndex: index }),

  removeFrame: (index) => set((state) => ({
    frames: state.frames.filter((_, i) => i !== index),
    selectedFrameIndex: state.selectedFrameIndex === index ? state.selectedFrameIndex-1 : state.selectedFrameIndex
  })),

  setFrameDataUrl: (index, dataUrl) => set((state) => ({
    frames: state.frames.map((frame, i) => (i === index ? { ...frame, dataUrl } : frame)),
  })),
  
  clearFrames: () => set({ frames: [] }),
}));
