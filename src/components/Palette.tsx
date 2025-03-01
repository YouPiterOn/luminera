import { useCanvasStore } from "../hooks/useCanvasStore";
import { usePaletteStore } from "../hooks/usePaletteStore";


const Palette = () => {
  const { colors, selectedColor, addColor, setSelectedColor } = usePaletteStore();
  const { setColor } = useCanvasStore();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setColor(color);
  };

  const handleAddColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    addColor(newColor);
    setSelectedColor(newColor);
    setColor(newColor);
  };

  return (
    <div className="text-base">
      <h2 className="text-lg font-bold mb-2 border-b-2 border-affair-800 pb-1">Color Palette</h2>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorSelect(color)}
            className={`w-8 h-8 border-2 ${selectedColor === color ? "border-watusi-200" : "border-affair-800"}`}
            style={{ backgroundColor: color }}
            aria-label={`Color ${color}`}
          />
        ))}
      </div>
      <div className="mt-4">
        <label className="block mb-1">Custom Color</label>
        <input
          type="color"
          value={selectedColor}
          onChange={handleAddColor}
          className="w-full h-10 bg-affair-900 border-2 border-affair-800"
        />
      </div>
    </div>
  );
};

export default Palette;
