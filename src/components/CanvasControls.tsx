import { useCanvasStore } from "../hooks/useCanvasStore";
import CheckboxInput from "./CheckboxInput";
import NumberInput from "./NumberInput";

const CanvasControls = () => {
  const { width, height, zoom, setWidth, setHeight, setZoom, setShowGrid } = useCanvasStore();

  return (
    <div className="mb-6 text-base">
      <h2 className="text-lg font-bold mb-2 border-b-2 border-affair-800 pb-1">Canvas Options</h2>
      <div className="space-y-2">
        <NumberInput
          value={width}
          onChange={(value) => setWidth(value)}
          label="Width:"
        />

        <NumberInput
          value={height}
          onChange={(value) => setHeight(value)}
          label="Height:"
        />

        <NumberInput
          value={zoom}
          onChange={(value) => setZoom(value)}
          unit={50}
          label="Zoom:"
        />

        <CheckboxInput
          checked={true}
          onChange={(isChecked) => setShowGrid(isChecked)}
          label="Show Grid:"
        />
      </div>
    </div>
  );
};

export default CanvasControls;
