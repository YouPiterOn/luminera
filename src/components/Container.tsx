import { ReactNode } from "react";

const Container = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`p-1 border-2 border-teal-1 bg-teal-0 ${className}`}>{children}</div>
  );
};

export default Container;