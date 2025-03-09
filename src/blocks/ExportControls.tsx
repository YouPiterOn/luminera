import { useState } from "react";
import Button from "../components/Button"
import SidebarSection from "../components/SidebarSection"
import { useCanvasStore } from "../hooks/useCanvasStore";
import { useExportCanvas } from "../hooks/useExportCanvas"
import { InstantNumberInput } from "../components/Input/NumberInput";

const ExportControls = () => {
  const { exportToPNG } = useExportCanvas();
  const { size } = useCanvasStore();
  const [scale, setScale] = useState(1);

  const handleDownload = async () => {
    const dataUrl = await exportToPNG(size.width, size.height, scale);
    if(!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "canvas.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <SidebarSection name="Export">
      <InstantNumberInput
        label="Upscale:"
        value={scale}
        onChange={(value) => setScale(value)}
      />
      <div className="mt-2">
        <Button onClick={handleDownload}>Export to PNG</Button>
      </div>
    </SidebarSection>
  )
}

export default ExportControls;