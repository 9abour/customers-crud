import { lazy, useEffect, useState } from "react";

const ActivityDayInfo = lazy(() => import("./ActivityDayInfo"));

type ActivityLogInfoType = {
	operation: string;
	info: string;
	customer: string;
};

const Activity = () => {
	const [todayActivity, setTodayActivity] = useState<ActivityLogInfoType[]>([]);
	const [yesterdayActivity, setYesterdayActivity] = useState<
		ActivityLogInfoType[]
	>([]);
	const [otherActivity, setOtherActivity] = useState<ActivityLogInfoType[]>([]);

	const [activityLog, setActivityLog] = useState([
		{ date: "today", history: todayActivity, isOpen: true },
		{ date: "yesterday", history: yesterdayActivity, isOpen: false },
		{ date: "other", history: otherActivity, isOpen: false },
	]);

	const activityLogFromLS = localStorage.getItem("activityLog");

	useEffect(() => {
		if (activityLogFromLS != null) {
			const dayNow = new Date().getUTCDate();

			const activityLogFromLSObj = JSON.parse(activityLogFromLS);

			const today: ActivityLogInfoType[] = [];
			const yesterday: ActivityLogInfoType[] = [];
			const other: ActivityLogInfoType[] = [];

			activityLogFromLSObj.map(
				(item: { operation: string; info: string; customer: string }) => {
					const dayBefore = new Date(
						item.info.split(", ").toString()
					).getUTCDate();
					if (dayNow == dayBefore) {
						today.push(item);
					} else if (dayNow - dayBefore == 1) {
						yesterday.push(item);
					} else {
						other.push(item);
					}
				}
			);

			setTodayActivity(today);
			setYesterdayActivity(yesterday);
			setOtherActivity(other);
		}
	}, [activityLogFromLS]);

	useEffect(() => {
		setActivityLog([
			{ date: "today", history: todayActivity, isOpen: true },
			{ date: "yesterday", history: yesterdayActivity, isOpen: false },
			{ date: "other", history: otherActivity, isOpen: false },
		]);
	}, [todayActivity, yesterdayActivity, otherActivity]);

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
		<div className="h-[40rem] py-4 rounded-md bg-[#252628] main-border">
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
