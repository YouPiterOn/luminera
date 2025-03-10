import { useCanvasStore } from "../hooks/useCanvasStore";
import Button from "../components/Button";
import { useState } from "react";
import { InstantNumberInput } from "../components/Input/NumberInput";

type NewCanvasModalProps = {
  onClose?: () => void;
}

const NewCanvasModal = ({ onClose }: NewCanvasModalProps) => {
  const { size, setSize, setClearCanvas } = useCanvasStore();

  const [tempWidth, setTempWidth] = useState(size.width);
  const [tempHeight, setTempHeight] = useState(size.height);

  const handleApply = () => {
    setSize(tempWidth, tempHeight);
    setClearCanvas(true);
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-ebony-clay-950/50 z-10">
      <div className="flex flex-col gap-4 bg-pearl-bush-200 border-2 border-cloudy-400 text-ebony-clay-950 p-4 shadow-lg w-80">
        <h2 className="text-lg font-bold">New Canvas</h2>

        <InstantNumberInput
          value={tempWidth}
          onChange={(value) => setTempWidth(value)}
          label="Width:"
        />

        <InstantNumberInput
          value={tempHeight}
          onChange={(value) => setTempHeight(value)}
          label="Height:"
        />

        <div className="flex justify-between pr-6">
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default NewCanvasModal;
