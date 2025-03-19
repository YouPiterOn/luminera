type ButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  highlighted?: boolean;
}

const ButtonTemplate = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className || ''}
    >
      {children}
    </button>
  );
};

const Button = ({ children, onClick, className, highlighted = false }: ButtonProps) => {
  return (
    <ButtonTemplate
      onClick={onClick}
      className={`
        border-2 border-ebony-clay-950 min-w-15 px-1 cursor-pointer
        ${highlighted ? 'bg-ebony-clay-800 text-pearl-bush-50 hover:bg-ebony-clay-900' : 'bg-pearl-bush-200 text-ebony-clay-950 hover:bg-pearl-bush-300'}
        ${className || ''}
      `}
    >
      {children}
    </ButtonTemplate>
  )
}

export const BorderlessButton = ({ children, onClick, className }: ButtonProps) => {
  return (
    <ButtonTemplate
      onClick={onClick}
      className={`cursor-pointer bg-pearl-bush-200 text-ebony-clay-950 ${className || ''}`}
    >
      {children}
    </ButtonTemplate>
  )
}

export default Button;
