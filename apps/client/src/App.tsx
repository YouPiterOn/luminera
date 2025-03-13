import { Route, Switch } from "wouter"
import CanvasPage from "./pages/CanvasPage"
import HomePage from "./pages/HomePage"
import PalettesPage from "./pages/PalettesPage"
import TrpcProvider from "./context/TrpcContext"

function App() {

  return (
    <TrpcProvider>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/canvas" component={CanvasPage} />
        <Route path="/palettes" component={PalettesPage} />
        <Route>404 Not Found</Route>
      </Switch>
    </TrpcProvider>
  )
}

export default App
