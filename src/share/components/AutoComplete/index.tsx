import SelectReact from 'react-select';

const AutoComplete = (props: any) => {
  const {
    options,
    handleOnChange,
    label,
    placeholder,
    iserror,
    value
  } = props;
  return (
    <div>
      {label && <label className='text-sm mb-1'>{label}</label>}
      <SelectReact
        closeMenuOnSelect={true}
        options={options}
        onChange={(e) => handleOnChange(e)}
        placeholder={placeholder}
        classNamePrefix='react-select'
        className={`auto-complete ${iserror ? 'iserror' : ''}`}
        isClearable
        value={value}
      />
    </div>
  );
};

export default AutoComplete;
