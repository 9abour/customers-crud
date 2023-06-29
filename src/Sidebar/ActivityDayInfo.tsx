import { BsFillCircleFill } from "react-icons/bs";
import { ActivityLogType } from "../../types";

const ActivityDayInfo = ({
	activity,
	onclick,
}: {
	activity: ActivityLogType;
	onclick: (data: string) => void;
}) => {
	return (
		<div className="px-3 mt-3">
			<button
				onClick={() => onclick(activity.date)}
				className="flex items-center gap-2 text-[#f9d3b4] cursor-pointer"
			>
				<span>
					<BsFillCircleFill size={15} />
				</span>
				<p className="font-medium capitalize">{activity.date}</p>
			</button>
			{/* History */}
			{activity.isOpen && (
				<div className="activity text-gray-400 overflow-y-scroll max-h-[13.3rem]">
					<div className="relative pl-5">
						<div className="absolute w-[1px] min-h-full bottom-0 left-[7.5px] bg-gradient-to-t from-[#f9d3b4]" />
						<div className="text-sm">
							{activity.history.length > 0 ? (
								[...activity.history]
									.reverse()
									.map(item => (
										<p key={item.info} className="pb-1">{`${item.info
											.split(" ")[1]
											.slice(0, 5)} ${item.info.split(" ")[2]} Customer ${
											item.customer
										} was ${item.operation}`}</p>
									))
							) : (
								<p>No activity.</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ActivityDayInfo;
