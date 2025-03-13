import { useState } from "react";
import Button from "../components/Button";
import { Palette } from "@luminera/types";
import { usePaletteStore } from "../hooks/usePaletteStore";

type PaletteCardProps = {
  palette: Palette;
}

const PaletteCard = ({ palette }: PaletteCardProps) => {
  const { setColors } = usePaletteStore();

  const [copiedColor, setCopiedColor] = useState('');

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 1000);
  };

  return (
    <div className="p-4 bg-pearl-bush-200 border-2 border-ebony-clay-950 flex flex-col items-center">
      <h3 className="text-lg font-bold text-ebony-clay-950">{palette.name}</h3>
      <p className="text-sm text-ebony-clay-800">by {palette.author}</p>
      <div className="flex gap-1 mt-2">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="relative w-8 h-8 border-2 border-ebony-clay-950 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => handleCopy(color)}
          >
            {copiedColor === color && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-ebony-clay-950 text-pearl-bush-100 text-xs px-2 py-1 z-10">
                Copied {color}
              </div>
            )}
          </div>
        ))}
      </div>
      <Button className="mt-3" onClick={() => setColors(palette.colors)}>Choose</Button>
    </div>
  );
};

export default PaletteCard;