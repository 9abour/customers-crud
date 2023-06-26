import { ButtonType } from "../../types.d";

const Button = (props: ButtonType) => {
	const { icon, text, onclick } = props;
	return (
		<button
			onClick={onclick}
			className="mx-auto f-c p-2 font-semibold rounded-md text-[#f9d3b4] hover:bg-[#3f4249] transition duration-300"
		>
			{icon}
			{text != undefined && <span>{text}</span>}
		</button>
	);
};

export default Button;
