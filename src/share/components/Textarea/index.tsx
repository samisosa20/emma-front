import { TextareaProps } from './Textarea.interface'

const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <div>
      {props.label && <label htmlFor={props.id} className="text-sm mb-1">{props.label}</label>}
      <textarea
        className={`border-2 rounded-lg w-full min-h-12 px-4 ${props.iserror ? 'border-red-500' : 'text-primary'}`}
        {...props}
      />
    </div>
  );
};

export default Textarea
