import { createHistoryStore, type CanvasAction } from "@luminera/drawing-canvas";

export const canvasHistoryStore = createHistoryStore<CanvasAction>();