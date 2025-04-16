export interface Size {
  width: number
  height: number
}

export interface Brush {
  name: BrushType;
  size: number;
}

export enum BrushType {
  Fill = "Fill",
  Eraser = "Eraser",
  Pencil = "Pencil",
}

export interface Frame {
  dataUrl: string;
  length: number;
}