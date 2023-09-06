import { InputProps } from './Input.interface'

const Input: React.FC<InputProps> = (props) => {
  return (
    <div>
      {props.label && <label htmlFor={props.id} className="text-sm mb-1">{props.label}</label>}
      <input
        className={`border-2 rounded-lg w-full h-12 px-4 ${props.iserror ? 'border-red-500' : 'text-primary'}`}
        {...props}
      />
    </div>
  );
};

export default Input
