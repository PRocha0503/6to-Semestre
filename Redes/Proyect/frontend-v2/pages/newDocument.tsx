import {
	AnchorButton,
	FileInput,
	Icon,
	InputGroup,
	Label,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import Notifications from "@components/Notifications";
import useCreateDocument, { CreateDocumentRequest } from "@hooks/document/useCreateDocument";
import { useUser } from "@hooks/user";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";


import styles from "../styles/newDocument.module.css";

const NewDocument: NextPage = () => {

	const [title, setTitle] = useState("");
	const [date, setDate] = useState<Date>(new Date());
	const [file, setFile] = useState<File | null>(null);
	const [expediente, setExpediente] = useState("");
	const [folio, setFolio] = useState("");

	const user = useUser()

	const [ request, setRequest ] = useState<CreateDocumentRequest>({
		title: "",
		folio : "",
		expediente : "",
		area: user?.areas?.[0] || "",
		onSuccess: () => router.push("/"),
		onError: () => setToasts([...toasts, { message: "Error subiendo documento", type: "danger" }]),
	});

	const { mutate } = useCreateDocument(request)
	
	const router = useRouter();
	
	const uploadDocument = async () => {
		mutate();
	}

	const [toasts, setToasts] = useState<any>([]);

	return (
		<>
		<Notifications toast={toasts} setToast={setToasts} />
		<div className={styles.center}>
			<div className={styles.textInputs}>
				<h1 className="bp4-heading">Subir Archivo	</h1>
				<Label as="h1">Los apartados marcados con * son obligatorios</Label>

				<div className={styles.textInput}>
					<FileInput
						fill = {true}
						disabled={false} 
						text="Escoger archivo..."  
						typeof="file.pdf"
						onInputChange={(e) => {
							setFile(e.target.files[0]);
						}}
						
					/>
				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					fill={false}
					type="text"
					leftElement={<Icon icon="document" />}
					placeholder="Titulo*"
					value={request.title}
					onChange={(e) => {
						setRequest({
							...request,
							title: e.target.value
						})
					}}
				/>
				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					fill={false}
					type="text"
					leftElement={<Icon icon="folder-close" />}
					placeholder="Expediente*"
					value={request.expediente}
					onChange={(e) => {
						setRequest({
							...request,
							expediente: e.target.value
						})
					}}
				/>
				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					type="folio"
					leftElement={<Icon icon="numerical" />}
					placeholder="Folio*"
					value={request.folio}
					onChange={(e) => {
						setRequest({
							...request,
							folio: e.target.value
						})
					}}
				/>
				</div>

				<div className={styles.textInput}>
				<DateInput
					
					fill = {true}
					showActionsBar={true}
					timePickerProps={{ precision: "minute" }}
					placeholder="Fecha*"
    				formatDate={date => date.toLocaleString()}
					todayButtonText="Hoy"
    				parseDate={str => new Date(str)}
					value={request.createdAt}
					onChange={(date : Date | null, userChaned: boolean) => {
							setRequest({
								...request,
								createdAt: date || new Date()
							})
					}}
					
				/>

				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					type="text"
					leftElement={<Icon icon="tag" />}
					placeholder="Etiquetas*"
				/>
				</div>

				<div className={styles.textInput}>
				<AnchorButton 
					text = "Subir" 
					rightIcon="upload"
					fill = {true}
					intent = "primary"
					onClick={uploadDocument}
				/>
				</div>
			</div>
		</div>
		</>
	);
};

export default NewDocument;
