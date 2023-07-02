import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { CrudContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { CustomerType } from "../../types";

const List = () => {
	const crud = useContext(CrudContext);
	const [searchValue, setSearchValue] = useState("");
	const [listToShow, setListToShow] = useState<CustomerType[] | undefined>([]);

	useEffect(() => {
		const items: CustomerType[] = [];
		if (searchValue != "") {
			crud?.crudState.customersList.map(item => {
				if (
					item.name
						.toLocaleLowerCase()
						.includes(searchValue.toLocaleLowerCase()) ||
					item.phoneNumber?.toString().slice(0, searchValue.length) ==
						searchValue ||
					item.email
						.toLocaleLowerCase()
						.split("@")[0]
						.includes(searchValue.toLocaleLowerCase()) ||
					item.birthday.includes(searchValue) ||
					item.dateNow.includes(searchValue)
				) {
					items.push(item);
				}
			});
		}

		if (searchValue != "") {
			setListToShow([...items]);
		} else {
			setListToShow(crud?.crudState.customersList);
		}
	}, [crud, searchValue]);

	return (
		<div>
			<h2 className="main-title mb-8">List of Customers</h2>
			<div className="flex justify-end items-center mb-3 px-1">
				<div className="md:w-[500px]">
					<Input
						onchange={e => setSearchValue(e)}
						type="text"
						label="Search"
						placeholder="Name, Date, etc..."
					/>
				</div>
			</div>
			<div className="overflow-x-auto table-container">
				<table className="table w-full">
					<tbody>
						<tr className="!bg-[#19191a]">
							<th className="!min-w-[5rem] !max-w-[5rem] p-4">#</th>
							<th>Name</th>
							<th>Added</th>
							<th>Birth</th>
							<th>Number</th>
							<th>Email</th>
							<th>Account NUM.</th>
							<th className="!min-w-[5rem] !max-w-[5rem] p-3">edit</th>
							<th className="!min-w-[5rem] !max-w-[5rem] p-3">delete</th>
						</tr>
					</tbody>
					<tbody>
						{listToShow?.map((item, index) => (
							<tr key={item.id}>
								<td className="!min-w-[4rem] p-3">
									<span>{index}</span>
								</td>
								<td>
									<span>{item.name}</span>
								</td>
								<td>
									<span>{item.dateNow}</span>
								</td>
								<td>
									<span>{item.birthday}</span>
								</td>
								<td>
									<span>{item.phoneNumber}</span>
								</td>
								<td>
									<span>{item.email}</span>
								</td>
								<td>
									<span>{item.id}</span>
								</td>
								<td className="!min-w-[5rem] p-3">
									<Button
										onclick={() => crud?.fillCustomerToUpdate(item.id)}
										icon={<AiFillEdit size={20} />}
									/>
								</td>
								<td className="!min-w-[5rem] p-3">
									<Button
										onclick={() => crud?.removeCustomer(item.id)}
										icon={<AiFillDelete color="red" size={20} />}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default List;
