import { InputProps } from './Select.interface'

const Select: React.FC<InputProps> = (props) => {
  return (
    <select
      className={`border-2 rounded-lg w-full h-12 px-4 ${props.iserror ? 'border-red-500' : 'text-primary'}`}
      {...props}
    >
      {props.options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
    </select>
  );
};

export default Select
