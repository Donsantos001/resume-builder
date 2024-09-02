import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const FormInput: FC<InputProps> = ({ type, value, className, ...rest }) => {
  return (
    <input
      className={`${className} border-gray-200 border-[1px] shadow-sm min-w-[240px] focus:border-blue-500 outline-none rounded-lg p-3 w-full transition-colors`}
      type={type || "text"}
      {...rest}
    />
  );
};

export default FormInput;
