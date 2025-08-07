import { InputProps } from "./Input.interface";

const Input: React.FC<InputProps> = (props) => {
  const { iserror, ...res } = props;
  return (
    <div>
      {props.label && (
        <label htmlFor={props.id} className="text-sm mb-1">
          {props.label}
        </label>
      )}
      <input
        className={`border rounded-lg w-full h-12 px-4 border-gray-300 ${
          iserror ? "border-red-500" : "text-primary"
        }`}
        {...res}
      />
    </div>
  );
};

export default Input;
