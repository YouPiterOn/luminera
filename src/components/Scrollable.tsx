const Scrollable = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative overflow-auto scrollbar-custom ${className || ''}`}>
      {children}
    </div>
  );
};

export default Scrollable;
