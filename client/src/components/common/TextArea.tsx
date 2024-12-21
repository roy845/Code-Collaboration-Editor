import React from "react";
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";

interface TextareaProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  fieldName: FieldPath<TFieldValues>;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

function Textarea<TFieldValues extends FieldValues>({
  register,
  fieldName,
  placeholder,
  onChange,
  className = "mt-1 block w-full px-3 py-2 border border-white bg-[#0d0c26] text-white rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left",
}: TextareaProps<TFieldValues>): JSX.Element {
  return (
    <textarea
      {...register(fieldName)}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  );
}

export default Textarea;
