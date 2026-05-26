import { twMerge } from "tailwind-merge";
import { MdClose } from "react-icons/md";

// Interface
import { ModalProps } from './Modal.interface';

// Style
import { useTheme } from './Modal.styles';

import Typography from '../Typography';

const Modal = (props: ModalProps) => {
  const { title, children, onClose, isOpen } = props;

  const { modal } = useTheme();
  return (
    <div className={twMerge(modal.container, isOpen ? 'flex' : 'hidden')}>
      <div className={modal.overlay}></div>
      <div className={modal.base}>
        <div className={modal.content}>
          <div className={modal.header}>
            <Typography variant='h3'>{title}</Typography>
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
          <div className='max-h-[75vh] overflow-y-auto'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
