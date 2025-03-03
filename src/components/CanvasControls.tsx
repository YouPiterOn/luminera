import { useEffect, useState } from "react";
import { useCanvasStore } from "../hooks/useCanvasStore";
import Button from "./Button";
import CheckboxInput from "./Input/CheckboxInput";
import NewCanvasModal from "./NewCanvasModal";
import { BufferedNumberInput } from "./Input/NumberInput";

const CanvasControls = () => {
  const { showGrid, zoom, setClearCanvas, setZoom, setShowGrid } = useCanvasStore();

  const [isNewCanvasModalOpen, setIsNewCanvasModalOpen] = useState(true);

  const [tempZoom, setTempZoom] = useState(zoom);

  useEffect(() => {
    setTempZoom(zoom);
  }, [zoom])

  return (
    <div className="mb-6 text-base">
      <h2 className="text-lg font-bold mb-2 border-b-2 border-affair-800 pb-1">Canvas Options</h2>
      <div className="space-y-2">
        <div>
          <Button onClick={() => setClearCanvas(true)}>Clear</Button>
        </div>

        <div>
          <Button onClick={() => setIsNewCanvasModalOpen(true)}>New</Button>
        </div>

        <BufferedNumberInput
          value={tempZoom}
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
        <div>
          {isNewCanvasModalOpen && (
            <NewCanvasModal
              onClose={() => setIsNewCanvasModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvasControls;
