import { ReactNode } from "react";

export interface ModalProps {
  title: string;
  isOpen: boolean;
  children?: ReactNode;
  onClose?: () => any;
}
