import { type CanvasAction } from '../types'

const undoStack: CanvasAction[] = [];
const redoStack: CanvasAction[] = [];

function addAction(action: CanvasAction): void {
  undoStack.push(action);
  redoStack.length = 0;
}

function undo(): CanvasAction | undefined {
  const action = undoStack.pop();
  if (action) redoStack.push(action);
  return action;
}

function redo(): CanvasAction | undefined {
  const action = redoStack.pop();
  if (action) undoStack.push(action);
  return action;
}

function clear(): void {
  undoStack.length = 0;
  redoStack.length = 0;
}

export default {
  addAction,
  undo,
  redo,
  clear
}