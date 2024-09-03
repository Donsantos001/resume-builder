import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: any;
  showIcon?: boolean;
}

const SlickLightButton: FC<ButtonProps> = ({
  title,
  showIcon,
  icon,
  ...rest
}) => {
  return (
    <button
      className="outline-none cursor-pointer text-blue-900 hover:bg-gray-300 bg-gray-200 rounded-lg border-none px-5 py-3"
      {...rest}
    >
      {showIcon && icon}
      <span className={`${showIcon ? "ml-2" : ""}`}>{title}</span>
    </button>
  );
};

export default SlickLightButton;
