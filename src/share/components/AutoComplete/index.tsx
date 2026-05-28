"use client";
import { useId, useEffect, useState, memo } from "react";
import SelectReact, { components } from "react-select";
import CategoryIcon from "../CategoryIcon";

const { Option } = components;
const IconOption = (props: any) => {
  return (
    <Option {...props}>
      <div className="flex items-center gap-x-4">
        {props.data.icon && (
          <CategoryIcon
            icon={props.data.icon}
            color={props.data.color}
            size="xs"
          />
        )}
        {props.data.label}
      </div>
    </Option>
  );
};

/**
 * ⚡ Bolt Optimization: Memoization of AutoComplete
 * 🎯 Problem: Re-rendering during form input in Movements view.
 * 📊 Impact: Prevents expensive re-renders of the dropdown component
 *    when other form fields (like amount or description) change.
 */
const AutoComplete = memo((props: any) => {
  const {
    options,
    handleOnChange,
    label,
    placeholder,
    iserror,
    value,
    instanceId,
    ...rest
  } = props;
  const internalId = useId();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {label && <label className="text-sm mb-1">{label}</label>}
      {isMounted ? (
        <SelectReact
          instanceId={instanceId || internalId}
          closeMenuOnSelect={true}
          options={options}
          onChange={(e) => handleOnChange(e)}
          placeholder={placeholder}
          classNamePrefix="react-select"
          className={`auto-complete ${iserror ? "iserror" : ""}`}
          isClearable
          value={value}
          components={{ Option: IconOption }}
          {...rest}
        />
      ) : (
        <div
          className={`h-[38px] w-full bg-wf-surface-container-lowest border border-wf-outline-variant rounded-[4px] animate-pulse`}
        />
      )}
    </div>
  );
});

export default AutoComplete;
