import { ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: "contained" | "outlined";
  size?: "sm" | "md" | "lg";
  color?: "default" | "dark" | "light";
  block?: boolean;
  disabled?: boolean;
  onClick?: () => any;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
