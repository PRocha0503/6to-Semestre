import { useEffect, useState } from "react";
import useAddUser from "@hooks/user/useAddUser";
import { Button, Label, InputGroup, Dialog, Intent } from "@blueprintjs/core";

import styles from "../styles/AddUserModal.module.css";
import { INTENT_DANGER } from "@blueprintjs/core/lib/esm/common/classes";
interface Props {
	_id: any;
	onClose: any;
	addToast: any;
}

const UploadFile = ({ _id, onClose, addToast }: Props) => {
	return (
		<Dialog
			autoFocus
			canEscapeKeyClose
			canOutsideClickClose={false}
			enforceFocus
			isOpen={_id ? true : false}
			onClose={() => onClose(null)}
			title="Añade el documento"
			isCloseButtonShown
			icon="user"
			transitionDuration={300}
		>
			<h1>{_id}</h1>
		</Dialog>
	);
};
export default UploadFile;
