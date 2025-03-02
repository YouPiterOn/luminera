type CheckboxInputProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
};

const CheckboxInput = ({ checked = false, onChange, label }: CheckboxInputProps) => {
  return (
    <div className="flex flex-row justify-between text-base items-center">
      <label>{label}</label>
      <div
        className={`w-4 h-4 border-2 border-ebony-clay-950 cursor-pointer ${checked
            ? "bg-ebony-clay-900 hover:bg-ebony-clay-800"
            : "bg-pearl-bush-200 hover:bg-pearl-bush-300"
          }`}
        onClick={() => {
          onChange?.(!checked);
        }}
      />
    </div>
  );
};

export default CheckboxInput;
