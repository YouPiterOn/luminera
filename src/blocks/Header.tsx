import { Link } from "wouter";
import NavLink from "../components/NavLink";

const Header = ({}) => {
  return (
    <header className="border-b-4 border-cloudy-400 bg-sisal-300 px-4 py-2">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-5xl tracking-normal font-bold cursor-pointer">
          <span className="text-ebony-clay-900">L</span>
          <span className="text-ebony-clay-800">u</span>
          <span className="text-ebony-clay-700">m</span>
          <span className="text-ebony-clay-600">i</span>
          <span className="text-ebony-clay-700">n</span>
          <span className="text-ebony-clay-800">e</span>
          <span className="text-ebony-clay-900">r</span>
          <span className="text-ebony-clay-950">a</span>
        </Link>
        <nav className="flex flex-row text-xl">
          <NavLink href='/'>Home</NavLink>
          <NavLink href='/canvas'>Canvas</NavLink>
          <NavLink href="/palettes">Palettes</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header;