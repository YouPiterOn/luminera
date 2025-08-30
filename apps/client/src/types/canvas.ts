import { BrushHandler } from "@luminera/drawing-canvas";

export interface Brush {
  name: string;
  resizable: boolean;
  handler: BrushHandler;
}

export interface Frame {
  dataUrl: string;
  length: number;
}