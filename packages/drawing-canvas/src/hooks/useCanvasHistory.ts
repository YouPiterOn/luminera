import { useContext } from "react";
import { CanvasContext } from "../contexts/CanvasContext";
import { useHistory } from "../store/historyStore";

export const useCanvasHistory = () => {
  const context = useContext(CanvasContext);

  if (!context) throw new Error("useCanvasHistory must be used inside CanvasProvider")

  return useHistory(context.history);
};