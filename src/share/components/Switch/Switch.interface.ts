export interface SwitchProps {
    id?: string;
    isChecked: boolean;
    label: string;
    name?: string;
    handleCheckboxChange: (e?: any) => any;
  }
