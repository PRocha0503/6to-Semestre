import { Button, H5, Intent } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";
import { useEffect, useState  } from "react";
import { IUser } from "types/user";
import useMakeUserAdmin from "@hooks/user/useMakeUserAdmin";

interface DeleteUserProps {
	_id: string;
	user: IUser;
}

const MakeAdmin = ({ _id, user }: DeleteUserProps) => {
	const [toasts, setToasts] = useState<any>([]);
	const { mutate, isSuccess, isError } = useMakeUserAdmin({
		userId: _id,
	});

	useEffect(() => {
		if (isSuccess) {
			setToasts([
				...toasts,
				{
					message: "Usuario hecho administrador correctamente",
					type: "success",
				},
			]);
		} else if (isError) {
			setToasts([
				...toasts,
				{ message: "Error haciendo al usuario administrador", type: "danger" },
			]);
		}
	}, [isSuccess, isError]);
	const content = (
		<div>
			<H5>¿Seguro que desea hacer al usuario administrador?</H5>
			<p>
				El usuario se volvera administrador y tendra acceso a todas las
				funciones.
			</p>
			<ul>
				<li>Crear, editar y eliminar usuarios (incluso a usted)</li>
				<li>Hacer aq otros usuarios administradores</li>
				<li>Modificar las areas de los usuarios</li>
			</ul>
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
					intent={Intent.PRIMARY}
					onClick={() => {
						mutate();
						Classes.POPOVER2_DISMISS;
					}}
				>
					Hacer Administrador
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
			<Button
				intent={Intent.PRIMARY}
				icon="take-action"
				small={true}
				disabled={user.isAdmin}
			></Button>
		</Popover2>
	);
};

export default MakeAdmin;
