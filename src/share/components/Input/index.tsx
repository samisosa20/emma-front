import { memo } from "react";
import { InputProps } from "./Input.interface";

const Input: React.FC<InputProps> = memo((props) => {
  const { iserror, value, label, id, ...res } = props;
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border rounded-lg w-full h-12 px-4 border-gray-300 ${
          iserror ? "border-red-500" : "text-primary"
        }`}
        value={value ?? ""}
        {...res}
      />
    </div>
  );
});

export default Input;
