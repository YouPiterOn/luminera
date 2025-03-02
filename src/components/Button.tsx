type ButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-pearl-bush-200 border-2 border-ebony-clay-950 min-w-15 px-1 cursor-pointer hover:bg-pearl-bush-300
        ${className || ''}
      `}
    >
      {children}
    </button>
  )
}

export default Button;