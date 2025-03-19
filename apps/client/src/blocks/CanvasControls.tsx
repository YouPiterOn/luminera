import { useState } from "react";
import { useCanvasStore } from "../hooks/useCanvasStore";
import Button from "../components/Button";
import CheckboxInput from "../components/Input/CheckboxInput";
import NewCanvasModal from "./NewCanvasModal";
import { BufferedNumberInput } from "../components/Input/NumberInput";
import SidebarSection from "../components/SidebarSection";
import ExportFileModal from "./ExportFileModal";

const CanvasControls = () => {
  const { showGrid, zoom, setClearCanvas, setZoom, setShowGrid } = useCanvasStore();

  const [isNewCanvasModalOpen, setIsNewCanvasModalOpen] = useState(false);
  const [isExportFileModalOpen, setIsExportFileModalOpen] = useState(false);

  return (
    <SidebarSection name="Canvas Controls">
      <div className="space-y-2">
        <div className="flex justify-between pr-6">
          <Button onClick={() => setClearCanvas(true)}>Clear</Button>
          <Button onClick={() => setIsExportFileModalOpen(true)}>Export</Button>
        </div>

        <div>
          <Button onClick={() => setIsNewCanvasModalOpen(true)}>New</Button>
        </div>

        <BufferedNumberInput
          value={zoom}
          onDone={(value) => {
            setZoom(value);
          }}
          unit={50}
          label="Zoom:"
          max={500}
          min={50}
        />

        <CheckboxInput
          checked={showGrid}
          onChange={(isChecked) => setShowGrid(isChecked)}
          label="Show Grid:"
        />
      </div>
      <div>
        <NewCanvasModal
          onClose={() => setIsNewCanvasModalOpen(false)}
          isOpen={isNewCanvasModalOpen}
        />
        <ExportFileModal
          onClose={() => setIsExportFileModalOpen(false)}
          isOpen={isExportFileModalOpen}  
        />
      </div>
    </SidebarSection>
  );
};

export default CanvasControls;
