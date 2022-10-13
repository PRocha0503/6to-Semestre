import {
	AnchorButton,
	FileInput,
	Icon,
	InputGroup,
	Label,
	MultistepDialog,
	DialogStep,
} from "@blueprintjs/core";
import Notifications from "@components/Notifications";
import CustomUploader from "@components/upload/CustomUploader";
import FileData from "@components/uploadFile/FileData";
import useCreateDocument, {
	CreateDocumentRequest,
} from "@hooks/document/useCreateDocument";
import useLoadFile from "@hooks/document/useLoadFile";
import { useUser } from "@hooks/user";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NewDocument: NextPage = () => {
	const [toasts, setToasts] = useState<any>([]);
	const [docId, setDocId] = useState<string>("");
	const user = useUser();

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
		console.log("use effect");
		console.log(docId);
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
			router.push("/");
		}
		if (isSuccess) {
			router.push("/");
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
			<Notifications toast={toasts} setToast={setToasts} />
			<MultistepDialog
				autoFocus
				canEscapeKeyClose
				canOutsideClickClose={false}
				enforceFocus
				isOpen={true}
				// onClose={onClose}
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

export default NewDocument;
