"use client";
import { useId, useEffect, useState, memo } from "react";
import SelectReact, { components } from "react-select";
import CategoryIcon from "../CategoryIcon";

const { Option, SingleValue } = components;

const IconOption = (props: any) => {
  return (
    <Option {...props}>
      <div className="flex items-center gap-x-2.5 px-1 py-0.5">
        {props.data.icon && (
          <CategoryIcon
            icon={props.data.icon}
            color={props.data.color}
            size="xs"
          />
        )}
        <span className="truncate text-sm">{props.data.label}</span>
      </div>
    </Option>
  );
};

const IconSingleValue = (props: any) => {
  return (
    <SingleValue {...props}>
      <div className="flex items-center gap-x-2 min-w-0">
        {props.data.icon && (
          <CategoryIcon
            icon={props.data.icon}
            color={props.data.color}
            size="xs"
          />
        )}
        <span className="truncate font-wf-body-regular text-sm">
          {props.data.label}
        </span>
      </div>
    </SingleValue>
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

  const finalId = instanceId || internalId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={finalId}
          className="block text-sm font-wf-label-caps text-wf-on-surface-variant uppercase tracking-wider mb-1"
        >
          {label}
        </label>
      )}
      {isMounted ? (
        <SelectReact
          instanceId={finalId}
          inputId={finalId}
          closeMenuOnSelect={true}
          options={options}
          onChange={(e) => handleOnChange(e)}
          placeholder={placeholder}
          classNamePrefix="react-select"
          className={`auto-complete ${iserror ? "iserror" : ""}`}
          isClearable
          value={value}
          menuPortalTarget={
            isMounted && typeof window !== "undefined" ? document.body : null
          }
          styles={{
            control: (base: any, state: any) => ({
              ...base,
              minHeight: "44px",
              borderRadius: "0.5rem",
              paddingLeft: "6px",
              paddingRight: "6px",
              borderColor: iserror
                ? "#ef4444"
                : state.isFocused
                  ? "var(--wf-primary, #6366f1)"
                  : "var(--wf-outline-variant, #cbd5e1)",
              boxShadow: state.isFocused
                ? "0 0 0 1px var(--wf-primary, #6366f1)"
                : "none",
              "&:hover": {
                borderColor: state.isFocused
                  ? "var(--wf-primary, #6366f1)"
                  : "var(--wf-outline, #94a3b8)",
              },
            }),
            valueContainer: (base: any) => ({
              ...base,
              padding: "4px 8px",
              gap: "4px",
            }),
            singleValue: (base: any) => ({
              ...base,
              marginLeft: "0px",
              marginRight: "0px",
              color: "inherit",
              maxWidth: "calc(100% - 8px)",
            }),
            placeholder: (base: any) => ({
              ...base,
              marginLeft: "0px",
              marginRight: "0px",
              color: "var(--wf-surface-tint, #94a3b8)",
            }),
            input: (base: any) => ({
              ...base,
              margin: "0px",
              paddingLeft: "0px",
              paddingRight: "0px",
              color: "inherit",
              opacity: 0,
              "& input": {
                background: "transparent !important",
                border: "none !important",
                boxShadow: "none !important",
              },
            }),
            menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
            menu: (base: any) => ({
              ...base,
              borderRadius: "0.75rem",
              overflow: "hidden",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              zIndex: 9999,
            }),
          }}
          components={{ Option: IconOption, SingleValue: IconSingleValue }}
          {...rest}
        />
      ) : (
        <div
          className={`h-[44px] w-full bg-wf-surface-container-lowest border border-wf-outline-variant rounded-lg animate-pulse`}
        />
      )}
    </div>
  );
});

export default AutoComplete;
