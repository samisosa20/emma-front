"use client";
import { getIconComponent } from "@/share/helpers";
import SelectReact, { components } from "react-select";

const { Option } = components;
const IconOption = (props: any) => {
  const Icon = getIconComponent(props.data.icon ?? "PiAcorn");
  return (
    <Option {...props}>
      <div className="flex items-center gap-x-4">
        {props.data.icon && (
          <div
            className={`rounded-full shadow-sm w-8 h-8 hover:opacity-80 flex justify-center items-center`}
            style={{
              background: props.data.color,
            }}
          >
            <Icon size={16} className="text-gray-200" />
          </div>
        )}
        {props.data.label}
      </div>
    </Option>
  );
};

const AutoComplete = (props: any) => {
  const { options, handleOnChange, label, placeholder, iserror, value } = props;
  return (
    <div>
      {label && <label className="text-sm mb-1">{label}</label>}
      <SelectReact
        closeMenuOnSelect={true}
        options={options}
        onChange={(e) => handleOnChange(e)}
        placeholder={placeholder}
        classNamePrefix="react-select"
        className={`auto-complete ${iserror ? "iserror" : ""}`}
        isClearable
        value={value}
        components={{ Option: IconOption }}
      />
    </div>
  );
};

export default AutoComplete;
