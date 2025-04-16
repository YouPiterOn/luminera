import { useCallback, useState } from "react";
import Scrollable from "../components/Scrollable"
import Button, { BorderlessButton } from "../components/Button";
import { ChevronDownIcon, ChevronUpIcon } from "raster-react";
import { useFramesStore } from "../hooks/useFramesStore";
import FrameDisplay from "../components/FrameDisplay";
import { createEmptyDataUrl } from "../utils/canvasUtils";

const AnimationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { frames, selectedFrameIndex, setSelectedFrame, addFrame } = useFramesStore();

  const addEmptyFrame = useCallback(() => {
    addFrame({ dataUrl: createEmptyDataUrl(1, 1), length: 1});
  }, [])

  const addCopyFrame = useCallback(() => {
    addFrame(frames[selectedFrameIndex]);
  }, [frames, selectedFrameIndex])

  return (
    <span
      className={`
          md:relative fixed bottom-0 min-w-full bg-pearl-bush-200 border-t-4 border-cloudy-400
          flex flex-col transition-all duration-200 overflow-hidden
          ${isOpen ? "h-48" : "h-12"} z-20
        `}
    >
      <div className="flex justify-end items-center h-12 pr-4">
        <BorderlessButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen
            ? <ChevronDownIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />
            : <ChevronUpIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />}
        </BorderlessButton>
      </div>

      {isOpen &&
        <Scrollable>
          <div className="flex flex-row gap-2 p-4 pt-0 min-w-full">
            {frames.map((frame, index) => (
              <FrameDisplay key={index} index={index} dataUrl={frame.dataUrl} onSelect={setSelectedFrame} highlighted={selectedFrameIndex === index} />
            ))}

            <div className="w-32 h-32 flex flex-col gap-2">
              <Button className="w-32 h-15" onClick={() => addEmptyFrame()}>
                Add Empty
              </Button>
              <Button className="w-32 h-15" onClick={() => addCopyFrame()}>
                Add Copy
              </Button>
            </div>
            
          </div>
        </Scrollable>
      }
    </span>
  )
}

export default AnimationBar;  