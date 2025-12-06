import { TextareaProps } from "./Textarea.interface";

const Textarea: React.FC<TextareaProps> = (props) => {
  const { iserror, ...res } = props;
  return (
    <div>
      {props.label && (
        <label htmlFor={props.id} className="text-sm mb-1">
          {props.label}
        </label>
      )}
      <textarea
        className={`border rounded-lg w-full min-h-12 px-4 ${
          iserror ? "border-red-500" : "text-primary"
        }`}
        {...res}
      />
    </div>
  );
};

export default Textarea;
