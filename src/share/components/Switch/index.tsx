import { SwitchProps } from './Switch.interface';

const Switch = (props: SwitchProps) => {
  const { handleCheckboxChange, isChecked, label, name = 'autoSaver' } = props;

  return (
    <>
      <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          name={name}
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-primary' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
          {label}
        </span>
      </label>
    </>
  );
};

export default Switch;
