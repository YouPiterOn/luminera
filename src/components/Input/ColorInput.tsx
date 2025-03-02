type ColorInputProps = {
  color?: string;
  onChange?: (color: string) => void;
  label?: string;
};

const ColorInput = ({ color = '#ffffff', onChange, label }: ColorInputProps) => {
  return (
    <div className="flex flex-row justify-between text-base items-center">
      <label>{label}</label>
      <input
          type="color"
          value={color}
          onChange={(e) => { onChange?.(e.target.value) }}
          className="w-8 h-8 border-2 border-ebony-clay-950 cursor-pointer outline-none"
        />
    </div>
  );
};

export default ColorInput;