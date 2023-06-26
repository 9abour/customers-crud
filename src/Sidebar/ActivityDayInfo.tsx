import { BsFillCircleFill } from "react-icons/bs";

interface Props {
	date: string;
	history: {
		operation: string;
		info: string;
		customer: string;
	}[];
	isOpen: boolean;
}

const ActivityDayInfo = ({
	activity,
	onclick,
}: {
	activity: Props;
	onclick: (data: string) => void;
}) => {
	return (
		<div className="pl-6 mt-3">
			<button
				onClick={() => onclick(activity.date)}
				className="flex items-center gap-2 text-[#f9d3b4] cursor-pointer"
			>
				<span>
					<BsFillCircleFill size={15} />
				</span>
				<p className="font-medium">{activity.date}</p>
			</button>
			{/* History */}
			{activity.isOpen && (
				<div className="relative pl-[7px] text-gray-400">
					<div className="absolute w-[1px] h-full top-0 bg-gradient-to-t from-[#f9d3b4]"></div>
					<div className="pl-5">
						<div className="text-sm">
							{activity.history.map(item => (
								<p key={item.info}>{`${item.info.split(",")[1]} Customer ${
									item.customer
								} was ${item.operation}`}</p>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ActivityDayInfo;
