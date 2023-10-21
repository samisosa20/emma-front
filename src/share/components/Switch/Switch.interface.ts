export interface SwitchProps {
    isChecked: boolean;
    label: string;
    name?: string;
    handleCheckboxChange: (e?: any) => any;
  }