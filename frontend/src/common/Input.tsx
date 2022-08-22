import { forwardRef } from "react";

interface InputProps {
  label?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "search";
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  type = "text",
  placeholder,
  onChange,
  value,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col items-start space-y-1">
      {label && <label className="text-xs font-medium text-gray-500">{label}</label>}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border sm:text-sm border-gray-300 rounded-md"
        {...props}
      />
    </div>
  )
});