import { Route, Switch } from "wouter"
import CanvasPage from "./pages/CanvasPage"
import HomePage from "./pages/HomePage"
import PalettesPage from "./pages/PalettesPage"

function App() {

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/canvas" component={CanvasPage} />
      <Route path="/palettes" component={PalettesPage} />
      <Route>404 Not Found</Route>
    </Switch>
  )
}

export default App
