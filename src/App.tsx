import Canvas from "./blocks/Canvas"
import CanvasControls from "./blocks/CanvasControls"
import Palette from "./blocks/Palette"
import Scrollable from "./components/Scrollable"

function App() {

  return (
    <div className="flex flex-col h-screen bg-pearl-bush-100 text-ebony-clay-950">
      {/* Header */}
      <header className="border-b-4 border-cloudy-400 bg-sisal-300 px-4 py-2">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl tracking-tight text">
            <span className="text-ebony-clay-900">L</span>
            <span className="text-ebony-clay-800">u</span>
            <span className="text-ebony-clay-700">m</span>
            <span className="text-ebony-clay-600">i</span>
            <span className="text-ebony-clay-700">n</span>
            <span className="text-ebony-clay-800">e</span>
            <span className="text-ebony-clay-900">r</span>
            <span className="text-ebony-clay-950">a</span>
          </h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Scrollable>
          <aside className="w-full h-fit min-h-full md:w-62 bg-pearl-bush-200 border-r-4 border-cloudy-400 p-4 flex flex-col">
            <CanvasControls />

            <Palette />
          </aside>
        </Scrollable>

        {/* Canvas Area */}
        <main className="flex flex-1 flex-row overflow-hidden items-center justify-center bg-pearl-bush-100">
          <div className="flex max-h-full max-w-full overflow-hidden"> 
            <Scrollable>
              <Canvas />
            </Scrollable>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
