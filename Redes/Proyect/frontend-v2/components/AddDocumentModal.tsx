import {
	DialogStep,
	MultistepDialog,
} from "@blueprintjs/core";
import useCreateDocument, {
	CreateDocumentRequest,
} from "@hooks/document/useCreateDocument";
import CustomUploader from "@components/upload/CustomUploader";
import FileData from "@components/uploadFile/FileData";
import Notifications from "@components/Notifications";
import useLoadFile from "@hooks/document/useLoadFile";


import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddDocumentModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const [toasts, setToasts] = useState<any>([]);
	const [docId, setDocId] = useState<string>("");

	const [request, setRequest] = useState<CreateDocumentRequest>({
		title: "",
		folio: "",
		expediente: "",
		area: undefined,
		onSuccess: (data) => {
			console.log("DATA", data._id);
			setDocId(data._id!);
		},
		onError: () =>
			setToasts([
				...toasts,
				{ message: "Error subiendo documento", type: "danger" },
			]),
	});
	const [file, setFile] = useState<File | null>(null);
	const {
		mutate,
		isLoading: createLoading,
		isSuccess: successCreate,
	} = useCreateDocument(request);
	const {
		mutate: mutateFile,
		isError,
		isLoading,
		isSuccess,
		error,
	} = useLoadFile({
		id: docId,
		file: file!,
	});
	const router = useRouter();

	useEffect(() => {
		if (
			successCreate &&
			!isSuccess &&
			!isLoading &&
			!isError &&
			file &&
			docId != ""
		) {
			console.log(docId);
			console.log("success create");
			mutateFile();
		}
		if (successCreate && !file) {
			onClose();
		}
		if (isSuccess) {
			onClose();
		}
		if (isError) {
			setToasts([
				...toasts,
				{ message: "Error subiendo documento", type: "danger" },
			]);
		}
	}, [successCreate, isSuccess, isError]);

	const uploadDocument = async () => {
		mutate();
	};

	return (
		<>
			<Notifications toasts={toasts} setToasts={setToasts} />
			<MultistepDialog
				autoFocus
				canEscapeKeyClose
				canOutsideClickClose={false}
				enforceFocus
				isOpen={isOpen}
				onClose={onClose}
				title="Sube tus documentos"
				closeButtonProps={{ minimal: true, text: "Cerrar" }}
				isCloseButtonShown
				showCloseButtonInFooter
				navigationPosition="top"
				initialStepIndex={0}
				icon="upload"
				transitionDuration={300}
				finalButtonProps={{
					text: "Subir",
					onClick: () => {
						uploadDocument();
					},
					loading: isLoading || createLoading,
				}}
				backButtonProps={{ text: "Atrás" }}
			>
				<DialogStep
					id={0}
					title="Rellena los campos"
					panel={
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								marginTop: "1rem",
							}}
						>
							<FileData request={request} setRequest={setRequest} />
						</div>
					}
					nextButtonProps={{
						minimal: true,
						text: "Siguiente",

						disabled:
							request.title && request.expediente && request.area
								? false
								: true,
						loading: createLoading,
					}}
				></DialogStep>
				<DialogStep
					id={1}
					title="Selecciona el archivo"
					panel={
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								marginTop: "1rem",
							}}
						>
							<CustomUploader
								file={file}
								onChange={setFile}
								acceptedFileTypes=".pdf"
							/>
						</div>
					}
					nextButtonProps={{
						minimal: true,
						text: "Siguiente",
						loading: isLoading,
					}}
				></DialogStep>
			</MultistepDialog>
		</>
	);
};

export default AddDocumentModal;
