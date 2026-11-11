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
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/50 ${
            isChecked ? 'bg-emerald-500 shadow-md shadow-emerald-500/25' : 'bg-slate-800 border border-slate-700'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full duration-200 transition-all ${
              isChecked ? 'translate-x-6 bg-slate-950' : 'bg-slate-400'
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-slate-200 font-wf-body-regular'>
          {label}
        </span>
      </label>
    </>
  );
});

export default Switch;
