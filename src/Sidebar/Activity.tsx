import { lazy, useContext, useEffect, useRef, useState } from "react";

const ActivityDayInfo = lazy(() => import("./ActivityDayInfo"));

const Activity = () => {
	const [activityLog, setActivityLog] = useState([
		{
			date: "Today",
			history: [
				{
					operation: "created",
					info: "2023-6-26, 10:00 PM",
					customer: "Mohamed",
				},
				{
					operation: "created",
					info: "2023-6-26, 10:00 PM",
					customer: "Mohamed",
				},
				{
					operation: "created",
					info: "2023-6-26, 10:00 PM",
					customer: "Mohamed",
				},
			],
			isOpen: true,
		},
		{
			date: "Yesterday",
			history: [
				{
					operation: "created",
					info: "2023-6-26, 10:00 PM",
					customer: "Mohamed",
				},
			],

			isOpen: false,
		},
		{
			date: "Other",
			history: [
				{
					operation: "created",
					info: "2023-6-26, 10:00 PM",
					customer: "Mohamed",
				},
			],

			isOpen: false,
		},
	]);

	const handleToggleDataInfo = (dateInfo: string) => {
		const updated = activityLog.map(item => {
			if (item.date == dateInfo) {
				return {
					...item,
					isOpen: true,
				};
			} else {
				return {
					...item,
					isOpen: false,
				};
			}
		});

		setActivityLog(updated);
	};

	return (
		<div className="h-[18rem] py-4 rounded-md bg-[#252628] main-border">
			<h2 className="main-title">Activity Log</h2>
			<div>
				{activityLog.map(item => (
					<ActivityDayInfo
						onclick={handleToggleDataInfo}
						key={item.date}
						activity={item}
					/>
				))}
			</div>
		</div>
	);
};

export default Activity;
