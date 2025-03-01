import { useState } from "react";

type CheckboxInputProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
};

const CheckboxInput = ({ checked = false, onChange, label }: CheckboxInputProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className="flex flex-row justify-between text-base items-center">
      <label>{label}</label>
      <div
        className={`w-4 h-4 border-2 border-ebony-clay-950 cursor-pointer ${
          isChecked ? "bg-ebony-clay-900" : "bg-pearl-bush-300"
        }`}
        onClick={() => {
          const newValue = !isChecked;
          setIsChecked(newValue);
          onChange?.(newValue);
        }}
      />
    </div>
  );
};

export default CheckboxInput;
