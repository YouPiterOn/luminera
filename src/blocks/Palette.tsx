import { useState } from "react";
import { useCanvasStore } from "../hooks/useCanvasStore";
import { usePaletteStore } from "../hooks/usePaletteStore";
import Button from "../components/Button";
import ColorInput from "../components/Input/ColorInput";
import SidebarSection from "../components/SidebarSection";


const Palette = () => {
  const { colors, selectedColor, addColor, setSelectedColor } = usePaletteStore();
  const { setColor } = useCanvasStore();

  const [tempColor, setTempColor] = useState(selectedColor);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setColor(color);
  };

  const handleAddColor = (color: string) => {
    addColor(color);
    setSelectedColor(color);
    setColor(color);
  };

  return (
    <SidebarSection name="Color Palette">
      <div className="grid grid-cols-6 w-full gap-1 mb-5">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorSelect(color)}
            className={`
              w-8 h-8 cursor-pointer p-0 m-0 border-2
              ${selectedColor === color ? "border-cloudy-400" : "border-ebony-clay-950 hover:border-ebony-clay-800"}
            `}
            style={{ backgroundColor: color }}
            aria-label={`Color ${color}`}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between w-full">
        <ColorInput
          color={tempColor}
          onChange={setTempColor}
        />
        <Button
          onClick={() => handleAddColor(tempColor)}
        >
          Add Color
        </Button>
      </div>
    </SidebarSection>
  );
};

export default Palette;
