import type {UseFormRegisterReturn} from "react-hook-form";

interface AskInputProps {
	label: string;
	name: string;
	kind?: "text" | "title";
	type: string;
	register?: UseFormRegisterReturn;
	required: boolean;
}

export default function AskInput({ label, name, kind = "text", register, type, required }: AskInputProps) {
	return (
		<div>
			<label className={"mb-1 block text-sm font-medium text-gray-700"} htmlFor={name}>
				{label}
			</label>

			{kind === "text" ? (
				<div className={"rounded-md relative flex items-center shadow-sm"}>
					<input
						id={name}
						required={required}
						{...register}
						type={type}
						className={"appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pantone focus:border-pantone-500"}
					/>
				</div>
			) : null}

			{kind === "title" ? (
				<div className={"rounded-md relative flex items-center shadow-sm"}>
					<input
						id={name}
						required={required}
						{...register}
						type={type}
						className={"appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pantone focus:border-pantone-500"}
						placeholder={"제목을 입력해주세요."}
					/>
				</div>
			) : null}
		</div>
	);
}