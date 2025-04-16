import { useState } from "react"
import Scrollable from "../components/Scrollable"
import BrushControls from "./BrushControls"
import CanvasControls from "./CanvasControls"
import PaletteControls from "./PaletteControls"
import { BorderlessButton } from "../components/Button"
import { ChevronLeftIcon, ChevronRightIcon } from "raster-react"

const CanvasSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Scrollable>
      <aside
        className={`
          md:relative fixed left-0 min-h-full bg-pearl-bush-200 border-r-4 border-cloudy-400
          p-4 flex flex-col transition-all duration-200
          ${isOpen ? "w-62" : "w-16"} z-30
        `}
      >
        <div className="flex justify-end">
          <BorderlessButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen
              ? <ChevronLeftIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />
              : <ChevronRightIcon strokeWidth={3} radius={1} className="size-6 text-ebony-clay-950 hover:text-ebony-clay-800" />}
          </BorderlessButton>
        </div>

        {isOpen && (
          <div>
            <CanvasControls />
            <PaletteControls />
            <BrushControls />
          </div>
        )}
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </Scrollable>
  );
};

export default CanvasSidebar;