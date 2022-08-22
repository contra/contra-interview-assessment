import { forwardRef } from "react"
import classnames from "classnames";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "text";
  onClick?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    label,
    variant = "primary",
    onClick
  }, ref) => {
  return (
    <button
      type="button"
      className={
        classnames(
          "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs \
          font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 \
          transition-colors duration-300 ease-in-out",
          {
            "text-gray-900 bg-white hover:bg-gray-200 focus:ring-gray-500" : variant === "text",
            "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500" : variant === "secondary",
            "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500" : variant === "primary",
          }
        )
      }
      onClick={onClick}
      ref={ref}
      >
      {label}
    </button>
  )
});