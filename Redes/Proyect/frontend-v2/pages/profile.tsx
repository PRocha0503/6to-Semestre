import { useEffect, useState, useMemo } from "react";
import { useUser } from "@hooks/user";

import { Button, InputGroup, Card, NonIdealState } from "@blueprintjs/core";

import useAddUser from "@hooks/user/useAddUser";
import useGetUsers from "@hooks/user/useGetUsers";
import Notifications from "@components/Notifications";
import { UsersTable } from "@components/UsersTable";

const Profile = () => {
	const user = useUser();
	const isAdmin = user!.isAdmin;
	const [newUsername, setNewUsername] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [toasts, setToasts] = useState<any>([]);
	const { mutate, isError, isLoading, isSuccess, error } = useAddUser({
		username: newUsername,
		password: newPassword,
	});
	// fetch tags from area
	const {
		data: data,
		isLoading: userLoading,
		isError: userisError,
		error: userError,
	} = useGetUsers();
	const [sortedIndexMap, setSortedIndexMap] = useState<number[]>([]);

	useEffect(() => {
		if (isSuccess) {
			console.log("CORRECT");
			setToasts([...toasts, { message: "Usuario añadido", type: "sucess" }]);
		} else if (isError) {
			console.log(error);
			setToasts([
				...toasts,
				{ message: "El usuario no pudo ser añadido", type: "danger" },
			]);
		}
		if (userisError && isAdmin) {
			setToasts([
				...toasts,
				{ message: "No se pudo cargar los usuarios", type: "danger" },
			]);
		}
	}, [isSuccess, isError, userisError]);
	const getTableData = () => {
		if (isError) {
			return <NonIdealState title="Error" description={error.message} />;
		}

		if (!data || data?.users?.length === 0) {
			return <NonIdealState title="No documents found" />;
		}
		console.log(data.users);

		return <UsersTable users={data.users} loading={userLoading} />;
	};
	return (
		<Card>
			<Notifications toast={toasts} setToast={setToasts} />
			<h1 className="bp4-heading">{user?.username}</h1>
			<h5 className="bp4-heading">Areas</h5>
			{user?.areas.map((area) => {
				return <p>{area}</p>;
			})}
			{isAdmin ? (
				<>
					<h1>Admin</h1>
					<InputGroup
						large
						placeholder="New username"
						leftIcon="user"
						type={"text"}
						value={newUsername}
						onChange={(e) => setNewUsername(e.target.value)}
					/>
					<InputGroup
						large
						placeholder="Username password"
						leftIcon="lock"
						type={"text"}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<Button icon="add" onClick={() => mutate()} loading={isLoading}>
						Add User
					</Button>
					{getTableData()}
				</>
			) : (
				<></>
			)}
		</Card>
	);
};
export default Profile;
