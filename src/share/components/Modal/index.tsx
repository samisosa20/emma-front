import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

// Interface
import { ModalProps } from "./Modal.interface";

// Style
import { useTheme } from "./Modal.styles";

import Typography from "../Typography";

/**
 * ⚡ Bolt Optimization: Portal mounting to document.body and memoization.
 * 🎯 Problem: When modals are rendered inside sticky/backdrop-blur headers or transformed elements,
 *    CSS creates a new containing block trapping fixed modals at the top of the header.
 * 📊 Impact: createPortal mounts the modal directly to document.body, guaranteeing perfect screen centering.
 */
const Modal = memo((props: ModalProps) => {
  const { title, children, onClose, isOpen } = props;
  const { modal } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <div
      className={`${modal.container} ${
        isOpen
          ? "opacity-100 pointer-events-auto visible"
          : "opacity-0 pointer-events-none invisible"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={modal.overlay} onClick={onClose}></div>
      <div
        className={`${modal.base} ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className={modal.content}>
          <div className={modal.header}>
            <Typography variant="h3" id="modal-title">
              {title}
            </Typography>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className={modal.button}
                aria-label="Cerrar modal"
              >
                <MdClose size={24} />
              </button>
            )}
          </div>
          <div className="overflow-y-auto flex-1 pt-3">{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
});

Modal.displayName = "Modal";
export default Modal;
