import { useEffect, useState } from "react";

import { Button, Label, InputGroup, Dialog, Intent } from "@blueprintjs/core";

import styles from "../styles/AddUserModal.module.css";
import { INTENT_DANGER } from "@blueprintjs/core/lib/esm/common/classes";
import useAddArea from "@hooks/area/useAddArea";
interface AddUserModalProps {
	open: boolean;
	onClose: any;
	addToast: any;
}

const AddUserModal = ({ open, onClose, addToast }: AddUserModalProps) => {
	const [area, setArea] = useState<string>("");
	const { mutate, isError, isLoading, isSuccess, error } = useAddArea({
		name: area,
	});

	useEffect(() => {
		if (isSuccess) {
			console.log("CORRECT");
			addToast("Area añadida correctamente", "success");
		} else if (isError) {
			addToast("Error al añadir area", "danger");
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
			title="Añade una nueva area"
			isCloseButtonShown
			icon="group-objects"
			transitionDuration={300}
		>
			<div className={styles.root}>
				<Label>Usuario</Label>
				<InputGroup
					large
					className={styles.input}
					placeholder="Nombre de area"
					leftIcon="group-objects"
					type={"text"}
					value={area}
					onChange={(e) => setArea(e.target.value)}
				/>

				<div className={styles.center}>
					<Button
						icon="add"
						className={styles.button}
						onClick={() => {
							mutate();
							onClose(false);
						}}
						loading={isLoading}
						intent={Intent.SUCCESS}
					>
						Añadir Area
					</Button>
				</div>
			</div>
		</Dialog>
	);
};
export default AddUserModal;
