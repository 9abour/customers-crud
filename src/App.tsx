import "./globals.scss";
import { BiMenu } from "react-icons/bi";
import { createContext, lazy, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CrudContextType, CustomerToUpdateType, CustomerType } from "../types";
import Swal from "sweetalert2";

const Activity = lazy(() => import("./Sidebar/Activity"));
const AddCustomer = lazy(() => import("./Sidebar/AddCustomer"));
const List = lazy(() => import("./Center/List"));

// eslint-disable-next-line react-refresh/only-export-components
export const CrudContext = createContext<CrudContextType | null>(null);

function App() {
	const [customersList, setCustomersList] = useState<CustomerType[]>([]);
	const [activityLog, setActivityLog] = useState([]);
	const [customerToUpdate, setCustomerToUpdate] = useState<
		CustomerToUpdateType | undefined
	>(undefined);

	const [crudState, setCrudState] = useState({
		customersList,
		activityLog,
	});

	const customersListFromLS = localStorage.getItem("customersList");

	const [menuIsOpen, setMenuIsOpen] = useState(true);
	const [hideMenuBtn, setHideMenuBtn] = useState(true);
	const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

	useEffect(() => {
		if (isSmallScreen) {
			setHideMenuBtn(false);
			setMenuIsOpen(false);
		} else {
			setMenuIsOpen(true);
		}
	}, [isSmallScreen]);

	useEffect(() => {
		if (customersListFromLS != null) {
			const customersListObj = JSON.parse(customersListFromLS);
			setCustomersList(customersListObj);
		}
	}, [customersListFromLS]);

	useEffect(() => {
		setCrudState({ activityLog, customersList });
	}, [activityLog, customersList]);

	const checkIfCustomerIsNotValid = (customer: CustomerType): boolean => {
		let customerIsNotValid = false;
		customersList.map(item => {
			if (
				item.phoneNumber == customer.phoneNumber ||
				item.email == customer.email
			) {
				customerIsNotValid = true;
			}
		});

		return customerIsNotValid;
	};

	const addActivity = (name: string | undefined, operation: string) => {
		const activityLogFromLS = localStorage.getItem("activityLog");

		const date = new Date();
		const dateStr = date.toLocaleString();

		const activityLog = {
			operation: operation,
			info: dateStr,
			customer: name,
		};

		if (activityLogFromLS != null) {
			localStorage.setItem(
				"activityLog",
				JSON.stringify([...JSON.parse(activityLogFromLS), activityLog])
			);
		} else {
			localStorage.setItem("activityLog", JSON.stringify([activityLog]));
		}
	};

	const addCustomer = (customer: CustomerType) => {
		const customersListFromLS = localStorage.getItem("customersList");

		if (customersListFromLS != null) {
			const customerListObj = JSON.parse(customersListFromLS);

			if (!checkIfCustomerIsNotValid(customer)) {
				localStorage.setItem(
					"customersList",
					JSON.stringify([...customerListObj, customer])
				);
				setCustomersList([...customerListObj, customer]);
				addActivity(customer.name, "created");
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "This customer already exist!",
				});
			}
		} else {
			localStorage.setItem("customersList", JSON.stringify([customer]));
			setCustomersList([customer]);
			addActivity(customer.name, "created");
		}
	};

	const removeCustomer = (id: string) => {
		addActivity(
			customersList.find((item: CustomerType) => item.id == id)?.name,
			"deleted"
		);

		const updated = customersList.filter(item => item.id != id);
		localStorage.setItem("customersList", JSON.stringify(updated));
		setCustomersList(updated);
	};

	const fillCustomerToUpdate = (id: string) => {
		const customer = customersList.find(item => item.id == id);

		setCustomerToUpdate(customer);
	};

	const updateCustomer = (newData: CustomerToUpdateType) => {
		const { id, name, birthday, phoneNumber, email } = newData;

		const updated = customersList.map(item => {
			if (item.id == id) {
				return {
					...item,
					name,
					birthday,
					phoneNumber,
					email,
				};
			} else {
				return {
					...item,
				};
			}
		});

		let customerIsNotValid = false;

		customersList.map(item => {
			if (
				item.id != id &&
				(item.phoneNumber == phoneNumber || item.email == email)
			) {
				customerIsNotValid = true;
			}
		});

		if (!customerIsNotValid) {
			setCustomersList(updated);
			localStorage.setItem("customersList", JSON.stringify(updated));
			setCustomerToUpdate(undefined);
			addActivity(name, "updated");
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "This customer already exist!",
			});
		}
	};

	return (
		<CrudContext.Provider
			value={{
				crudState,
				customerToUpdate,
				removeCustomer,
				addCustomer,
				fillCustomerToUpdate,
				updateCustomer,
				checkIfCustomerIsNotValid,
			}}
		>
			<main className="relative w-full h-full flex gap-4">
				{/* Sidebar */}
				{menuIsOpen && (
					<div className="relative w-[calc(100vw-2rem)] md:w-[400px] h-screen">
						<div className="w-full h-[calc(100%-2rem)] mt-4 ml-4 flex flex-col gap-4">
							<Activity />
							<AddCustomer />
						</div>
					</div>
				)}
				{/* Menu Button */}
				{!hideMenuBtn && (
					<button
						onClick={() => setMenuIsOpen(!menuIsOpen)}
						className="absolute right-[2rem] top-[2rem] block md:hidden"
					>
						<BiMenu size={30} color="#f9d3b4" />
					</button>
				)}
				{/* Center */}
				<div
					className={`w-[calc(100%-2rem)] md:w-[calc(100%-362px)] m-4 py-4 rounded-md bg-[#252628] main-border ${
						menuIsOpen && isSmallScreen ? "hidden" : "block"
					}`}
				>
					<List />
				</div>
			</main>
		</CrudContext.Provider>
	);
}

export default App;
