import { Link } from "wouter";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-ebony-clay-900 hover:text-ebony-clay-700 transition-colors"
    >
      {children}
    </Link>
  );
};

export default NavLink;