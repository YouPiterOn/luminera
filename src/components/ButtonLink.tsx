import { Link } from "wouter";

type ButtonProps = {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  highlighted?: boolean;
}

const ButtonLink = ({ children, href = '', className, highlighted = false }: ButtonProps) => {
  return (
    <Link
      href={href}
      className={`
        border-2 border-ebony-clay-950 min-w-15 px-1 cursor-pointer
        ${highlighted ? 'bg-ebony-clay-800 text-pearl-bush-50 hover:bg-ebony-clay-900' : 'bg-pearl-bush-200 text-ebony-clay-950 hover:bg-pearl-bush-300'}
        ${className || ''}
      `}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
