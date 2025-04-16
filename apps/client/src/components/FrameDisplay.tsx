type FrameDisplayProps = {
  index: number;
  dataUrl: string;
  highlighted?: boolean;
  onSelect: (index: number) => void;
}

const FrameDisplay = ({ index, dataUrl, onSelect, highlighted }: FrameDisplayProps) => {
  return (
    <div className="min-w-32">
      <img
        src={dataUrl === '' ? undefined : dataUrl}
        alt={`Frame ${index}`}
        onClick={() => onSelect(index)}
        className={`border-2 w-32 h-32 cursor-pointer ${highlighted ? "border-ebony-clay-900" : "border-ebony-clay-950"}`}
      />
    </div>
  )
}

export default FrameDisplay;