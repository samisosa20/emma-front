export interface CheckboxProps {
  isChecked: boolean;
  label: string;
  handleCheckboxChange: (e: any) => any;
  id?: string;
}