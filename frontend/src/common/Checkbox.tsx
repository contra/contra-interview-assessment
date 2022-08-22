interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  name: string;
  id: string;
  disabled? : boolean;
  value?: string;
}
  
  
export const Checkbox = ({
  id,
  label,
  name,
} : CheckboxProps) => {
  return(
    <div className="flex flex-row justify-start items-center space-x-4">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
      />
      <label htmlFor={id} className="text-xs font-medium text-gray-500">
        {label}
      </label>
    </div>
  )
};