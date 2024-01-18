import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cc } from "../utils/cc";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={cc("modal", isClosing && "closing")} 
    >
      <div className="overlay"></div>
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
};
export default Modal;
