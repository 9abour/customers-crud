import { InputType } from "../../types";

const Input = (props: InputType) => {
	const { type, label, placeholder, value, onchange, autoFocus } = props;

	return (
		<div className="relative flex flex-col px-3 mt-6">
			<label className="absolute top-[-12px] mx-2 px-2 bg-[#252628] text-[#f9d3b4]">
				{label}
			</label>
			<input
				onChange={e => onchange(e.target.value)}
				type={type}
				placeholder={placeholder}
				autoFocus={autoFocus}
				className="w-full py-2 px-5 border rounded-md border-[#f9d3b4a3] text-white bg-[#252628] placeholder:text-[#6a6b6e] outline-none focus:border-[#f9d3b4]"
				value={value}
			/>
		</div>
	);
};

export default Input;
