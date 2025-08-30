export type BrushHandler = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  brushSize: number
) => void;

export interface CanvasAction {
  currentX: number;
  currentY: number;
  lastX: number | null;
  lastY: number | null;
  brushSize: number;
  brushHandler: BrushHandler;
}