type SidebarSectionProps = {
  children?: React.ReactNode;
  name?: string;
}


const SidebarSection = ({children, name = ''}: SidebarSectionProps) => {
  return (
    <div className="text-base">
      <h2 className="text-lg font-bold mb-2 border-b-2 border-ebony-clay-950 pb-1">{name}</h2>
      {children}
    </div>
  )
}

export default SidebarSection;