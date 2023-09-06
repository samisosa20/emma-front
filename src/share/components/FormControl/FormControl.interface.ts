import type { ControllerFieldState } from 'react-hook-form';
import { ReactNode } from "react";

export interface FormControlProps {
    fieldState: ControllerFieldState,
    children?: ReactNode;
    withLabel?: boolean;
}