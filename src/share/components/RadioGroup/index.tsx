import { SwitchProps } from './RadioGroup.interface';

const RadioGroup = (props: SwitchProps) => {
  const { handleRadioChange, name, label, options = [], value } = props;

  return (
    <>
      {label && <label className='text-sm mb-1'>{label}</label>}
      <div className='flex'>
        {options.map((option) => (
          <label
            className={`hover:bg-yellow-200 text-primary inline-flex items-center py-2 px-3 shadow-lg cursor-pointer ${value === option.value ? 'bg-yellow-400': ''}`}
            key={option.value}
          >
            <input
              type='radio'
              className='pointer-none absolute invisible'
              name={`radio-option_${name}`}
              value={option.value}
              onClick={(e) => handleRadioChange(e)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </>
  );
};

export default RadioGroup;
