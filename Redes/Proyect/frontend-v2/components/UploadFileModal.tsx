import { useEffect, useState } from "react";
import useAddUser from "@hooks/user/useAddUser";
import {
	Button,
	Label,
	InputGroup,
	Dialog,
	Intent,
	FileInput,
} from "@blueprintjs/core";

import styles from "../styles/AddUserModal.module.css";
import {
	INTENT_DANGER,
	INTENT_PRIMARY,
} from "@blueprintjs/core/lib/esm/common/classes";
import CustomUploader from "./upload/CustomUploader";
import useLoadFile from "@hooks/document/useLoadFile";
interface Props {
	_id: any;
	onClose: any;
	addToast: any;
}

const UploadFile = ({ _id, onClose, addToast }: Props) => {
	const [file, setFile] = useState<File | null>(null);
	const { mutate, isError, isLoading, isSuccess, error } = useLoadFile({
		id: _id,
		file: file!,
	});

	const upload = () => {
		mutate();
	};
	return (
		<Dialog
			autoFocus
			canEscapeKeyClose
			canOutsideClickClose={false}
			enforceFocus
			isOpen={_id ? true : false}
			onClose={() => {
				setFile(null);
				onClose(null);
			}}
			title="Añade el documento"
			isCloseButtonShown
			icon="user"
			transitionDuration={300}
		>
			<div
				style={{
					padding: "20px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<CustomUploader
					file={file}
					onChange={setFile}
					acceptedFileTypes=".pdf"
				/>
				<Button intent={Intent.PRIMARY} onClick={upload}>
					Subir
				</Button>
			</div>
		</Dialog>
	);
};
export default UploadFile;
