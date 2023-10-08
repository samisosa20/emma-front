import { twMerge } from "tailwind-merge";

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
            {onClose && <button onClick={onClose} className={modal.button}>X</button>}
          </div>
          <div className='max-h-[50vh] overflow-y-auto'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
