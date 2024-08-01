import { ReactNode } from "react";

export interface TypographyProps {
  id?: string;
  children?: ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "link";
  onClick?: () => any;
}
