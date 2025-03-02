import { create } from "zustand";

interface PaletteState {
  colors: string[];
  selectedColor: string;
  addColor: (color: string) => void;
  setSelectedColor: (color: string) => void;
}

export const usePaletteStore = create<PaletteState>((set) => ({
  colors: ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00"],
  selectedColor: "#000000",
  addColor: (color) =>
    set((state) => ({
      colors: state.colors.includes(color) ? state.colors : [...state.colors, color],
    })),
  setSelectedColor: (color) => set({ selectedColor: color }),
}));
