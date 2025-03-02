import { ChevronLeftIcon, ChevronRightIcon } from "raster-react";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  unit?: number;
}

const NumberInput = ({ value = 0, onChange, label, unit = 1 }: NumberInputProps) => {
  return (
    <div className="flex flex-row justify-between text-base items-center">
      <label>{label}</label>
      <div className="flex flex-row items-center">
        <button
          className="cursor-pointer"
          onClick={() => onChange(value - unit)}
        >
          <ChevronLeftIcon size={24} strokeWidth={3} radius={1} className="text-ebony-clay-950 hover:text-ebony-clay-800" />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="border-2 border-ebony-clay-950 text-center rounded-none outline-none focus:border-ebony-clay-800 focus:text-ebony-clay-800 px-1 w-15 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          className="cursor-pointer"
          onClick={() => onChange(value + unit)}
        >
          <ChevronRightIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />
        </button>
      </div>

    </div>
  );
}

export default NumberInput