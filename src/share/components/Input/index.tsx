import { InputProps } from './Input.interface'

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className={`border-2 rounded-lg w-full h-12 px-4 ${props.iserror ? 'border-red-500' : 'text-primary'}`}
      {...props}
    />
  );
};

export default Input
