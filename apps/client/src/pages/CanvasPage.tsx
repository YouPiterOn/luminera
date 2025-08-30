import AnimationBar from "../blocks/AnimationBar"
import CanvasSidebar from "../blocks/CanvasSidebar"
import Header from "../blocks/Header"
import Scrollable from "../components/Scrollable"
import { CanvasProvider, DrawingCanvas } from "@luminera/drawing-canvas"

const CanvasPage = () => {

  return (
    <CanvasProvider>
      <div className="flex flex-col h-screen bg-pearl-bush-100 text-ebony-clay-950">
        <Header />

        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <CanvasSidebar />

          <div className="flex flex-1 flex-col overflow-hidden">
            <main className="flex flex-1 flex-row overflow-hidden items-center justify-center bg-pearl-bush-100">
              <div className="flex max-h-full max-w-full overflow-hidden">
                <Scrollable>
                  <div className="border-2 border-cloudy-400">
                    <DrawingCanvas />
                  </div>
                </Scrollable>
              </div>
            </main>
            <AnimationBar />
          </div>
        </div>
      </div>
    </CanvasProvider>
  )
}

export default CanvasPage
