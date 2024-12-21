import React from "react";
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  fieldName: FieldPath<TFieldValues>;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: Array<{ label: string; value: string }>;
  className?: string;
  multiple?: boolean;
}

function Input<TFieldValues extends FieldValues>({
  register,
  fieldName,
  placeholder,
  type,
  options,
  onChange,
  multiple = false,
  className = "mt-1 block w-full px-3 py-2 border border-white bg-[#0d0c26] text-white rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left",
}: InputProps<TFieldValues>): JSX.Element {
  if (options) {
    return (
      <select
        {...register(fieldName)}
        className={`${className} cursor-pointer`}
        multiple={multiple}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      {...register(fieldName)}
      type={type}
      placeholder={placeholder}
      className={type === "date" ? `${className} cursor-pointer` : className}
      onChange={onChange}
    />
  );
}

export default Input;
