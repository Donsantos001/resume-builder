import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: any;
  showIcon?: boolean;
}

const SlickButton: FC<ButtonProps> = ({ title, showIcon, icon, ...rest }) => {
  return (
    <button
      className="outline-none cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-lg border-none px-5 py-3"
      {...rest}
    >
      {showIcon && icon}
      <span className="ml-2">{title}</span>
    </button>
  );
};

export default SlickButton;
