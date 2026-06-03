import { memo } from "react";
import { SwitchProps } from './Switch.interface';

const Switch = memo((props: SwitchProps) => {
  const { handleCheckboxChange, isChecked, label, name = 'autoSaver', id } = props;

  return (
    <>
      <label
        htmlFor={id}
        className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center group'
      >
        <input
          id={id}
          type='checkbox'
          name={name}
          className='sr-only peer'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-wf-primary/50 ${
            isChecked ? 'bg-wf-primary' : 'bg-wf-outline-variant'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white shadow-sm duration-200 ${
              isChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-wf-on-surface'>
          {label}
        </span>
      </label>
    </>
  );
});

export default Switch;
