import SidebarSection from "../components/SidebarSection";
import Button from "../components/Button";
import { InstantNumberInput } from "../components/Input/NumberInput";
import { Brush } from "../types/canvas";
import { useState } from "react";
import { useCanvasParamsActions, useCanvasParamsStore } from "@luminera/drawing-canvas";

const brushes: Brush[] = [
  {
    name: 'pencil',
    resizable: true,
    handler: (ctx, x, y, brushSize) => {
      ctx.fillRect(x - brushSize + 1, y - brushSize + 1, brushSize * 2 - 1, brushSize * 2 - 1);
    },
  },
  {
    name: 'eraser',
    resizable: true,
    handler: (ctx, x, y, brushSize) => {
      ctx.clearRect(x - brushSize + 1, y - brushSize + 1, brushSize * 2 - 1, brushSize * 2 - 1);
    },
  }
];

const BrushControls = () => {
  const [selectedBrush, setSelectedBrush] = useState<Brush>(brushes[0]);

  const brushSize = useCanvasParamsStore((state) => state.brushSize);

  const { setBrushSize, setBrushHandler } = useCanvasParamsActions();

  const handleSizeChange = (value: number) => {
    setBrushSize(value);
  }

  const handleBrushChange = (b: Brush) => {
    setSelectedBrush(b);
    setBrushHandler(b.handler);
  }

  return (
    <SidebarSection name="Tools">
      <div className="space-y-2">
        {brushes.map((b, i) => (
          <div key={i}>
            <Button
              key={b.name}
              onClick={() => handleBrushChange(b)}
              highlighted={selectedBrush.name === b.name}
            >
              {b.name}
            </Button>
          </div>
        ))}

        {selectedBrush.resizable && (
          <InstantNumberInput
            value={brushSize}
            onChange={handleSizeChange}
            unit={1}
            label={`${selectedBrush.name} size:`}
          />
        )}
      </div>
    </SidebarSection>
  );
};

export default BrushControls;
