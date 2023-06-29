export type ButtonType = {
	icon: ReactNode;
	text?: string;
	onclick?: () => void;
};

export type InputType = {
	type: string;
	label: string;
	placeholder?: string;
	onchange: (value: string | number | Data) => void;
	autoFocus?: boolean;
	value?: string | number | date;
};

export type CustomerType = {
	id: string;
	name: string;
	dateNow: string;
	birthday: string;
	email: string;
	phoneNumber: number | null;
};
export type CustomerToUpdateType = {
	id: string;
	name: string;
	birthday: string;
	email: string;
	phoneNumber: number | null;
};

export interface CrudStateType {
	activityLog: activityLog[];
	customersList: CustomerType[];
}

export interface CrudContextType {
	crudState: CrudStateType;
	removeCustomer: (id: string) => void;
	addCustomer: (customer: CustomerType) => void;
	customerToUpdate: customerToUpdate;
	fillCustomerToUpdate: (id: string) => void;
	updateCustomer: (customer: CustomerToUpdateType) => void;
	checkIfCustomerIsNotValid: (customer: CustomerType) => boolean;
}

export interface ActivityLogType {
	date: string;
	history: {
		operation: string;
		info: string;
		customer: string;
	}[];
	isOpen: boolean;
}
