import { HTMLProps } from 'react';
export interface InputProps extends HTMLProps<HTMLSelectElement> {
    iserror?: boolean;
    options: {
        value: string;
        label: string;
    }[]
}