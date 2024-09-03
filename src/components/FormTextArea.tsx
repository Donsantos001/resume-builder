import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

const FormTextArea: FC<InputProps> = ({ type, value, className, ...rest }) => {
  return (
    <textarea
      value={value}
      className={`${className} border-gray-200 border-[1px] shadow-sm min-w-[240px] focus:border-blue-500 outline-none rounded-lg p-3 w-full transition-colors`}
      {...rest}
    />
  );
};

export default FormTextArea;
