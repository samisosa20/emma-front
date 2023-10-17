import { ChecboxProps } from './Checkbox.interface';

const Checkbox = (props: ChecboxProps) => {
  const { handleCheckboxChange, isChecked, label } = props;

  return (
    <label className='fiona-container-checkbox'>
      {label}
      <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/>
      <span className='checkmark'></span>
    </label>
  );
};

export default Checkbox;
