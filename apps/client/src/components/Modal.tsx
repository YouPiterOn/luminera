type ModalProps = {
  children?: React.ReactNode;
  isOpen?: boolean
}

const Modal = ({ children, isOpen = false }: ModalProps) => {
  if (isOpen) return (
    <div className="fixed inset-0 flex items-center justify-center bg-ebony-clay-950/50 z-10">
      <div className="flex flex-col gap-4 bg-pearl-bush-200 border-2 border-cloudy-400 text-ebony-clay-950 p-4 shadow-lg w-80">
        {children}
      </div>
    </div>
  )

  else return <></>
}

export default Modal