import { ButtonType } from "../../types/buttonTypes";

interface ButtonProps {
  text: string;
  type: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  text,
  type,
  onClick,
  disabled,
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
