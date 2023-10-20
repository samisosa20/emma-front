export interface SwitchProps {
    name: string;
    label: string;
    value: string;
    handleRadioChange: (e: any) => any;
    options: {
      value: string;
      label: string;
      disabled?: boolean;
    }[]
  }