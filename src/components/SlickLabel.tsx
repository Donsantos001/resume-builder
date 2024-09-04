import { FC, ButtonHTMLAttributes } from "react";

interface DivProps extends ButtonHTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: any;
  showIcon?: boolean;
}

const SlickLabel: FC<DivProps> = ({ title, showIcon, icon, ...rest }) => {
  return (
    <div
      className="outline-none cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-lg border-none px-5 py-3"
      {...rest}
    >
      {showIcon && icon}
      <span className={`${showIcon ? "ml-2" : ""}`}>{title}</span>
    </div>
  );
};

export default SlickLabel;
