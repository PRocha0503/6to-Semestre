import { useEffect, useState } from "react";
import useAddUser from "@hooks/user/useAddUser";
import { Button, Label, InputGroup, Dialog, Intent } from "@blueprintjs/core";

import styles from "../styles/AddUserModal.module.css";
import { INTENT_DANGER } from "@blueprintjs/core/lib/esm/common/classes";
interface AddUserModalProps {
	open: boolean;
	onClose: any;
	addToast: any;
}

const AddUserModal = ({ open, onClose, addToast }: AddUserModalProps) => {
	const [newUsername, setNewUsername] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const { mutate, isError, isLoading, isSuccess, error } = useAddUser({
		username: newUsername,
		password: newPassword,
	});

	useEffect(() => {
		if (isSuccess) {
			console.log("CORRECT");
			addToast("Usuario añadido correctamente", "success");
		} else if (isError) {
			addToast("Error al añadir el usuario", "danger");
			onClose(false);
		}
	}, [isSuccess, isError]);

	return (
		<Dialog
			autoFocus
			canEscapeKeyClose
			canOutsideClickClose={false}
			enforceFocus
			isOpen={open}
			onClose={() => onClose(false)}
			title="Añade un nuevo usuario"
			isCloseButtonShown
			icon="user"
			transitionDuration={300}
		>
			<div className={styles.root}>
				<Label>Usuario</Label>
				<InputGroup
					large
					className={styles.input}
					placeholder="Nuevo usuario"
					leftIcon="user"
					type={"text"}
					value={newUsername}
					onChange={(e) => setNewUsername(e.target.value)}
				/>
				<Label>Contraseña</Label>
				<InputGroup
					large
					fill={false}
					className={styles.input}
					placeholder="Contraseña de usuario"
					leftIcon="lock"
					type={"text"}
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<div className={styles.center}>
					<Button
						icon="add"
						className={styles.button}
						onClick={() => mutate()}
						loading={isLoading}
						intent={Intent.SUCCESS}
					>
						Add User
					</Button>
				</div>
			</div>
		</Dialog>
	);
};
export default AddUserModal;
