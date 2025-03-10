import BrushControls from "../blocks/BrushControls"
import Canvas from "../blocks/Canvas"
import CanvasControls from "../blocks/CanvasControls"
import ExportControls from "../blocks/ExportControls"
import Header from "../blocks/Header"
import PaletteControls from "../blocks/PaletteControls"
import Scrollable from "../components/Scrollable"
import { CanvasProvider } from "../context/CanvasContext"

const CanvasPage = () => {

  return (
    <CanvasProvider>
      <div className="flex flex-col h-screen bg-pearl-bush-100 text-ebony-clay-950">
        <Header />

        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <Scrollable>
            <aside className="w-full h-fit min-h-full md:w-62 bg-pearl-bush-200 border-r-4 border-cloudy-400 p-4 flex flex-col">
              <CanvasControls />

              <PaletteControls />

              <BrushControls />

              <ExportControls />
            </aside>
          </Scrollable>

          <main className="flex flex-1 flex-row overflow-hidden items-center justify-center bg-pearl-bush-100">
            <div className="flex max-h-full max-w-full overflow-hidden">
              <Scrollable>
                <Canvas />
              </Scrollable>
            </div>
          </main>
        </div>
      </div>
    </CanvasProvider>
  )
}

export default CanvasPage
