import { ChevronLeftIcon, ChevronRightIcon } from "raster-react";
import { useState } from "react";

type NumberInputProps = {
  value: number;
  onChange?: (value: number) => void;
  onDone?: (value: number) => void;
  label?: string;
  unit?: number;
}

const NumberInput = ({ value = 0, onChange, onDone, label, unit = 1 }: NumberInputProps) => {
  return (
    <div className="flex flex-row justify-between text-base items-center">
      <label>{label}</label>
      <div className="flex flex-row items-center">
        <button
          className="cursor-pointer"
          onClick={() => {
            onChange?.(value - unit);
            onDone?.(value - unit);
          }}
        >
          <ChevronLeftIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && onDone?.(value)}
          onBlur={() => onDone?.(value)}
          className="border-2 border-ebony-clay-950 text-center rounded-none outline-none focus:border-ebony-clay-800 focus:text-ebony-clay-800 px-1 w-15 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          className="cursor-pointer"
          onClick={() => {
            onChange?.(value + unit);
            onDone?.(value + unit);
          }}
        >
          <ChevronRightIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />
        </button>
      </div>

    </div>
  );
}

export const InstantNumberInput = (props: NumberInputProps) => <NumberInput {...props} />;

type BufferedNumberInputProps = {
  value: number;
  onDone: (value: number) => void;
  label?: string;
  unit?: number;
  min?: number;
  max?: number;
};

/**
 * Stores state inside, applying onDone on blur, or enter press
 * @param value Initial value
 * @param onDone Function executed when user finished entering the value / scale buttons press
 * @param label Text to the left of input
 * @param unit Scale buttons unit
 * @param min Min value applied to onDone
 * @param max Max value applied to onDone
 * @returns 
 */
export const BufferedNumberInput = ({ value, onDone, label, unit, min = -Infinity, max = Infinity }: BufferedNumberInputProps) => {
  const [tempValue, setTempValue] = useState(value);

  const doneHandler = (newValue: number) => {
    const limitedValue = Math.min(max, Math.max(min, newValue))
    setTempValue(limitedValue);
    onDone?.(limitedValue);
  }

  return (
    <NumberInput
      value={tempValue}
      onChange={setTempValue}
      onDone={doneHandler}
      label={label}
      unit={unit}
    />
  );
};
