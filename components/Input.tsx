import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label?: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
  placeholder: string;
  loginInput?: boolean;
}

export default function Input({
  label,
  name,
  register,
  type,
  required,
  placeholder,
  loginInput,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="rounded-md relative flex items-center shadow-sm">
        <input
          placeholder={placeholder}
          id={name}
          required={required}
          {...register}
          type={type}
          className={
            loginInput
              ? "appearance-none w-full px-3 py-3 border-none bg-zinc-100 rounded-md text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pantone-500 focus:border-pantone-500"
              : "appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-pantone-500 focus:border-pantone-500"
          }
        />
      </div>
    </div>
  );
}
