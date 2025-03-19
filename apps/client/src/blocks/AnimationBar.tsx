import { useState } from "react";
import Scrollable from "../components/Scrollable"
import { BorderlessButton } from "../components/Button";
import { ChevronDownIcon, ChevronUpIcon } from "raster-react";

const AnimationBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Scrollable>
      <span
        className={`
          md:relative fixed bottom-0 min-w-full bg-pearl-bush-200 border-t-4 border-cloudy-400
          p-4 flex flex-col transition-all duration-300
          ${isOpen ? "h-48" : "h-15"} z-50
        `}
      >
        <div className="flex justify-end">
          <BorderlessButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen
              ? <ChevronDownIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />
              : <ChevronUpIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />}
          </BorderlessButton>
        </div>
      </span>
    </Scrollable>
  )
}

export default AnimationBar;