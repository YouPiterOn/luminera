import { useState } from "react";
import { useCanvasStore } from "../hooks/useCanvasStore";
import Button from "../components/Button";
import CheckboxInput from "../components/Input/CheckboxInput";
import NewCanvasModal from "./NewCanvasModal";
import { BufferedNumberInput } from "../components/Input/NumberInput";
import SidebarSection from "../components/SidebarSection";

const CanvasControls = () => {
  const { showGrid, zoom, setClearCanvas, setZoom, setShowGrid } = useCanvasStore();

  const [isNewCanvasModalOpen, setIsNewCanvasModalOpen] = useState(false);

  return (
    <SidebarSection name="Canvas Controls">
      <div className="space-y-2">
        <div>
          <Button onClick={() => setClearCanvas(true)}>Clear</Button>
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
        {isNewCanvasModalOpen && (
          <NewCanvasModal
            onClose={() => setIsNewCanvasModalOpen(false)}
          />
        )}
      </div>
    </SidebarSection>
  );
};

export default CanvasControls;
