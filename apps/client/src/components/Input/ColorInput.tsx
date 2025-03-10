type ColorInputProps = {
  color?: string;
  onChange?: (color: string) => void;
};

const ColorInput = ({ color = '#ffffff', onChange }: ColorInputProps) => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => { onChange?.(e.target.value) }}
      className="w-8 h-8 border-2 border-ebony-clay-950 cursor-pointer outline-none"
    />
  );
};

export default ColorInput;