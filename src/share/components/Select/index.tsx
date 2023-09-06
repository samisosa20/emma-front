import { InputProps } from './Select.interface';

const Select: React.FC<InputProps> = (props) => {
  return (
    <div>
      {props.label && (
        <label htmlFor={props.id} className='text-sm mb-1'>
          {props.label}
        </label>
      )}
      <select
        className={`border-2 rounded-lg w-full h-12 px-4 ${
          props.iserror ? 'border-red-500' : 'text-primary'
        }`}
        {...props}
        defaultValue={''}
      >
        {props.placeholder && <option value='' disabled>{props.placeholder}</option>}
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
