import { useCanvasStore } from "../hooks/useCanvasStore";
import Button from "../components/Button";
import { useCallback, useState } from "react";
import { InstantNumberInput } from "../components/Input/NumberInput";
import Modal from "../components/Modal";

type NewCanvasModalProps = {
  onClose?: () => void;
  isOpen?: boolean;
}

const NewCanvasModal = ({ onClose, isOpen }: NewCanvasModalProps) => {
  const { size, setSize, setClearCanvas } = useCanvasStore();

  const [tempWidth, setTempWidth] = useState(size.width);
  const [tempHeight, setTempHeight] = useState(size.height);

  const handleApply = useCallback(() => {
    setSize(tempWidth, tempHeight);
    setClearCanvas(true);
    onClose?.();
  }, [])

  return (
    <Modal isOpen={isOpen}>
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
        <Button onClick={() => onClose?.()}>Close</Button>
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </Modal>
  );
};

export default NewCanvasModal;
