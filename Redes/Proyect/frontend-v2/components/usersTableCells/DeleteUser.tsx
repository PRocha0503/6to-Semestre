import { Button, H5, Intent } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";
import { useEffect, useState } from "react";
import { IUser } from "types/user";
import useDeleteUser from "@hooks/user/useDeleteUser";

interface DeleteUserProps {
	_id: string;
	user: IUser;
}

const DeleteUser = ({ _id, user }: DeleteUserProps) => {
	const [toasts, setToasts] = useState<any>([]);
	const { mutate, isSuccess, isError } = useDeleteUser({
		userId: _id,
	});

	useEffect(() => {
		if (isSuccess) {
			setToasts([
				...toasts,
				{ message: "Usario eliminado exitosamente", type: "success" },
			]);
		} else if (isError) {
			setToasts([
				...toasts,
				{ message: "Error eliminado usario", type: "danger" },
			]);
		}
	}, [isSuccess, isError]);
	const content = (
		<div>
			<H5>¿Seguro que desea borrar el usuario?</H5>
			<p>
				El usuario perdera toda su información y permisos. Esta acción es
				irreversible
			</p>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginTop: 15,
					marginBottom: 15,
				}}
			>
				<Button
					onClick={() => {}}
					style={{ marginRight: 10 }}
					className={Classes.POPOVER2_DISMISS}
				>
					Cancelar
				</Button>
				<Button
					intent={Intent.DANGER}
					onClick={() => {
						mutate();
					}}
				>
					Borrar usuario
				</Button>
			</div>
		</div>
	);
	return (
		<Popover2
			content={content}
			captureDismiss={true}
			popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
			enforceFocus={true}
		>
			<Button intent={Intent.DANGER} icon="trash" small={true}></Button>
		</Popover2>
	);
};

export default DeleteUser;
