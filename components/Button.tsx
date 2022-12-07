import { cls } from "@libs/client/utils";

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cls(
        "w-full bg-pantone-light hover:bg-pantone transition-colors text-white px-4 py-5 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-pantone focus:outline-none",
        large ? "py-3 text-xl" : "py-2 text-base"
      )}
    >
      {text}
    </button>
  );
}
