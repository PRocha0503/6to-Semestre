import { useEffect, useState, useMemo } from "react";
import { useUser } from "@hooks/user";

import { Button, InputGroup, Card, NonIdealState } from "@blueprintjs/core";

import useGetUsers from "@hooks/user/useGetUsers";
import Notifications from "@components/Notifications";
import AddUserModal from "@components/AddUserModal";
import { UsersTable } from "@components/UsersTable";

const Profile = () => {
	const user = useUser();
	const isAdmin = user!.isAdmin;
	const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);

	const [toasts, setToasts] = useState<any>([]);

	// fetch tags from area
	const {
		data,
		isLoading: userLoading,
		isError: userisError,
		error: userError,
	} = useGetUsers();

	const addToast = (message: string, type: string) => {
		setToasts([...toasts, { message, type }]);
	};

	useEffect(() => {
		if (userisError && isAdmin) {
			addToast("Error al cargar los usuarios", "danger");
		}
	}, [userisError]);

	const getTableData = () => {
		if (!data || data?.users?.length === 0) {
			return <NonIdealState title="No documents found" />;
		}
		return <UsersTable users={data.users} loading={userLoading} />;
	};
	return (
		<Card>
			<Notifications toast={toasts} setToast={setToasts} />
			<h1 className="bp4-heading">{user?.username}</h1>
			<h5 className="bp4-heading">Areas</h5>
			{user?.areas.map((area) => {
				console.log(area);
				return <p>{area}</p>;
			})}
			{isAdmin ? (
				<>
					<h1>Admin</h1>
					<Button icon="new-person" onClick={() => setAddUserModalOpen(true)}>
						Añadir usuario
					</Button>

					{getTableData()}
				</>
			) : (
				<></>
			)}
			<AddUserModal
				open={addUserModalOpen}
				onClose={setAddUserModalOpen}
				addToast={addToast}
			/>
		</Card>
	);
};
export default Profile;
