import { AiFillEdit } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import Input from "../UI/Input";
import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../App";
import { v4 as uuid } from "uuid";

const AddCustomer = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [birthday, setBirthday] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
	const [email, setEmail] = useState<string>("");

	const crud = useContext(CrudContext);

	const clearInput = () => {
		[setFirstName, setLastName, setBirthday, setEmail].map(item => item(""));
		setPhoneNumber(null);
	};

	const handleAddCustomer = () => {
		const name = `${firstName} ${lastName}`;
		const nameIsValid = /\w+\s\w+/.test(name);
		const birthdayIsValid = /\w{4}-\w{2}-\w{2}/.test(`${birthday}`);
		const dataNow = new Date().toLocaleDateString("en-CA");

		if (nameIsValid && birthdayIsValid && phoneNumber != null && email != "") {
			crud?.addCustomer({
				id: uuid(),
				name: name,
				dateNow: dataNow,
				birthday: birthday,
				email: email,
				phoneNumber: phoneNumber,
			});
		}
	};

	const handleUpdateCustomer = () => {
		crud?.updateCustomer({
			id: crud.customerToUpdate.id,
			name: `${firstName} ${lastName}`,
			birthday: birthday,
			phoneNumber: phoneNumber,
			email: email,
		});

		clearInput();
	};

	useEffect(() => {
		if (crud?.customerToUpdate != undefined) {
			const { name, birthday, phoneNumber, email } = crud.customerToUpdate;
			setFirstName(name.split(" ")[0]);
			setLastName(name.split(" ")[1]);
			setBirthday(birthday);
			setPhoneNumber(phoneNumber);
			setEmail(email);
		}
	}, [crud?.customerToUpdate]);

	return (
		<div className="h-[100%] py-4 rounded-md bg-[#252628] main-border">
			<h2 className="main-title">
				{crud?.customerToUpdate == undefined ? "Add" : "Update"} Customer
			</h2>
			<form
				className="mt-12"
				onSubmit={e => {
					e.preventDefault();
					crud?.customerToUpdate == undefined
						? handleAddCustomer()
						: handleUpdateCustomer();
				}}
			>
				<Input
					onchange={value => setFirstName(value)}
					type="text"
					label="First Name"
					placeholder="Mohamed"
					value={firstName}
					autoFocus={true}
				/>
				<Input
					onchange={value => setLastName(value)}
					type="text"
					label="Last Name"
					placeholder="Ahmed"
					value={lastName}
				/>
				<Input
					onchange={value => setBirthday(value)}
					type="date"
					label="Date Of Birth"
					value={birthday}
				/>
				<Input
					onchange={value => setPhoneNumber(value)}
					type="number"
					label="Phone Number"
					placeholder="01*********"
					value={phoneNumber}
				/>
				<Input
					onchange={value => setEmail(value)}
					type="email"
					label="Email"
					placeholder="9abour@gmail.com"
					value={email}
				/>
				<div className="mx-3">
					<button className="w-full bg-[#f9d3b4] mt-8 p-2 rounded-md f-c gap-3">
						{crud?.customerToUpdate == undefined ? (
							<BsPersonFillAdd size={30} />
						) : (
							<AiFillEdit size={30} />
						)}
						<span className="text-xl font-semibold ">Customer</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddCustomer;
