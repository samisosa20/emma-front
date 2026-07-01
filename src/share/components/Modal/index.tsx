import { memo } from "react";
import { MdClose } from "react-icons/md";

// Interface
import { ModalProps } from './Modal.interface';

// Style
import { useTheme } from './Modal.styles';

import Typography from '../Typography';

/**
 * ⚡ Bolt Optimization: Memoization and class merging optimization.
 * 🎯 Problem: Modal was missing memoization and using expensive twMerge for non-conflicting classes.
 * 📊 Impact: Prevents unnecessary re-renders and reduces CPU overhead by skipping twMerge parsing.
 */
const Modal = memo((props: ModalProps) => {
  const { title, children, onClose, isOpen } = props;

  const { modal } = useTheme();
  return (
    <div
      className={`${modal.container} ${
        isOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
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
          <div className="max-h-[75vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
});

export default Modal;
