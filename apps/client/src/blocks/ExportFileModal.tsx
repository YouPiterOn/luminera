import { useCallback, useState } from "react";
import Button from "../components/Button";
import { InstantNumberInput } from "../components/Input/NumberInput";
import Modal from "../components/Modal"
import { useCanvasStore } from "../hooks/useCanvasStore";
import { useExportCanvas } from "../hooks/useExportCanvas";

type ExportFileModalProps = {
  onClose?: () => void;
  isOpen?: boolean;
}

const ExportFileModal = ({ onClose, isOpen }: ExportFileModalProps) => {
  const { exportToPNG } = useExportCanvas();
  const { size } = useCanvasStore();
  const [scale, setScale] = useState(1);

  const handleDownload = useCallback(() => {
    const dataUrl = exportToPNG(size.width, size.height, scale);
    if(!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "canvas.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onClose?.();
  }, [exportToPNG, size, scale])

  return (
    <Modal isOpen={isOpen}>
      <InstantNumberInput
        label="Upscale:"
        value={scale}
        onChange={(value) => setScale(value)}
      />
      <div className="flex justify-between pr-6">
        <Button onClick={handleDownload}>Export to PNG</Button>
        <Button onClick={() => onClose?.()}>Close</Button>
      </div>
    </Modal>
  )
}

export default ExportFileModal;