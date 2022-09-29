import { useState } from "react";
import { useUser } from "@hooks/user";

import { Button, InputGroup } from "@blueprintjs/core";

import useAddUser from "@hooks/user/useAddUser";

const Profile = () => {
	const user = useUser();
	const [newUsername, setNewUsername] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const { mutate, isError, isLoading, isSuccess } = useAddUser({
		username: newUsername,
		password: newPassword,
	});
	const addUser = () => {
		try {
			mutate();
		} catch (err) {}
	};

	return (
		<div>
			<h1 className="bp4-heading">{user?.username}</h1>
			<h5 className="bp4-heading">Areas</h5>
			{user?.areas.map((area) => {
				return <p>{area}</p>;
			})}
			{user.isAdmin ? (
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
					<Button icon="add" onClick={addUser} loading={isLoading}>
						Add User
					</Button>
				</>
			) : (
				<></>
			)}
		</div>
	);
};
export default Profile;
