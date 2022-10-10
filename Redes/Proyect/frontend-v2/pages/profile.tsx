import { useEffect, useState, useMemo } from "react";
import { useUser } from "@hooks/user";

import {
	Button,
	InputGroup,
	Card,
	NonIdealState,
	Icon,
	Intent,
} from "@blueprintjs/core";

import useGetUsers from "@hooks/user/useGetUsers";
import Notifications from "@components/Notifications";
import AddUserModal from "@components/AddUserModal";
import { UsersTable } from "@components/UsersTable";
import useGetProfile from "@hooks/user/useGetProfile";
import { CustomTag } from "@components/CustomTag";
import AddLabelModal from "@components/AddLabelModal";

const Profile = () => {
	const user = useUser();
	const isAdmin = user!.isAdmin;
	const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
	const [toasts, setToasts] = useState<any>([]);
	const [addLabelArea, setAddLabelArea] = useState<string>("");
	// fetch tags from area
	const {
		data,
		isLoading: userLoading,
		isError: userisError,
		error: userError,
	} = useGetUsers();

	const {
		data: profile,
		isLoading: profileLoading,
		isError: profileError,
	} = useGetProfile();

	const addToast = (message: string, type: string) => {
		setToasts([...toasts, { message, type }]);
	};

	useEffect(() => {
		if (userisError && isAdmin) {
			addToast("Error al cargar los usuarios", "danger");
		}
		if (profileError) {
			addToast("Error al cargar el perfil", "danger");
		}
	}, [userisError]);

	const getTableData = () => {
		if (!data || data?.users?.length === 0) {
			return <NonIdealState title="No documents found" />;
		}
		return <UsersTable users={data.users} loading={userLoading} />;
	};
	if (profileLoading || !profile) {
		return <div>Loading...</div>;
	}
	return (
		<Card>
			<Notifications toast={toasts} setToast={setToasts} />
			<h1 className="bp4-heading">{user?.username}</h1>
			<h5 className="bp4-heading">Areas</h5>
			{profile.areas.map((area) => {
				return (
					<div style={{ marginBottom: "1rem" }}>
						<p>{area.name}</p>
						<div
							style={{
								display: "flex",
								width: "100%",
								marginBottom: "5px",
							}}
						>
							{area.tags.map((tag, i) => {
								console.log(tag);
								if (i < 10) {
									return (
										<>
											<CustomTag
												tag={tag}
												addToast={addToast}
												areaName={area.name}
											/>
										</>
									);
								}
								if (i === 10) {
									return <Icon icon="more" />;
								}
								return null;
							})}
						</div>
						<Button
							icon="plus"
							small
							minimal
							onClick={() => setAddLabelArea(area.name)}
						/>
					</div>
				);
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
			<AddLabelModal
				open={addLabelArea != ""}
				areaName={addLabelArea}
				addToast={addToast}
				onClose={() => setAddLabelArea("")}
			/>
		</Card>
	);
};
export default Profile;
