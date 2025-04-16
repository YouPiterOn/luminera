import SidebarSection from "../components/SidebarSection";
import Button from "../components/Button";
import { InstantNumberInput } from "../components/Input/NumberInput";
import { useCanvasStore } from "../hooks/useCanvasStore";
import { Brush, BrushType } from "../types/canvas";
import { useState } from "react";

const brushes = [
  { name: BrushType.Pencil, size: 1 },
  { name: BrushType.Eraser, size: 1 },
  { name: BrushType.Fill, size: 0 },
];

const BrushControls = () => {
  const { brush, setBrush } = useCanvasStore();

  const [tempSize, setTempSize] = useState(brush.size);

  const handleSizeChange = (value: number) => {
    setTempSize(value);
    setBrush({ ...brush, size: value });
  }

  const handleBrushChange = (b: Brush) => {
    setBrush(b);
    setTempSize(b.size);
  }

  return (
    <SidebarSection name="Tools">
      <div className="space-y-2">
        {brushes.map((b, i) => (
          <div key={i}>
            <Button
              key={b.name}
              onClick={() => handleBrushChange(b)}
              highlighted={brush.name === b.name}
            >
              {b.name}
            </Button>
          </div>
        ))}

        {brush.name !== BrushType.Fill && (
          <InstantNumberInput
            value={tempSize}
            onChange={handleSizeChange}
            unit={1}
            label={`${brush.name} size:`}
          />
        )}
      </div>
    </SidebarSection>
  );
};

export default BrushControls;
