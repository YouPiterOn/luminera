import { useSyncExternalStore } from 'react';

export type HistorySnapshot = {
  canUndo: boolean;
  canRedo: boolean;
};

export type HistoryStore<T> = {
  push(action: T): void;
  undo(): T | undefined;
  redo(): T | undefined;
  clear(): void;
  subscribe(listener: () => void): () => void;
  getSnapshot(): HistorySnapshot;
};

export function createHistoryStore<T>(): HistoryStore<T> {
  let undoStack: T[] = [];
  let redoStack: T[] = [];
  let snapshot: HistorySnapshot;

  const listeners = new Set<() => void>();

  const updateSnapshot = () => {
    snapshot = {
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0
    };
  };

  const notify = () => {
    updateSnapshot();
    listeners.forEach((l) => l());
  };

  const getSnapshot = (): HistorySnapshot => snapshot;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    push(action: T) {
      undoStack.push(action);
      redoStack = [];
      notify();
    },
    undo() {
      const action = undoStack.pop();
      if (action) {
        redoStack.push(action);
        notify();
      }
      return action;
    },
    redo() {
      const action = redoStack.pop();
      if (action) {
        undoStack.push(action);
        notify();
      }
      return action;
    },
    clear() {
      undoStack = [];
      redoStack = [];
      notify();
    },
    subscribe,
    getSnapshot,
  };
}

export function useHistory<T>(store: HistoryStore<T>) {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return {
    ...state,
    push: store.push,
    undo: store.undo,
    redo: store.redo,
    clear: store.clear,
  };
}
