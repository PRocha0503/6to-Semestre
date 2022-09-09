import axios from "axios";
import { useEffect, useState } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell,
} from "@carbon/react";

import styles from "../styles/DocumentPreview.module.scss";
interface Document {
	_id: string;
	title: string;
	path: String;
	tags: [];
	createdBy: {};
}
interface Folder {
	_id: string;
	name: string;
	insideFolders: Node[];
	insideDocuments: Document[];
	path: String;
	tags: [];
	createdBy: {};
}

const SelectedItem = ({ f }: any) => {
	// console.log(f);
	const [folder, setFolder] = useState<Folder>({
		_id: "",
		name: "s",
		insideFolders: [],
		insideDocuments: [],
		path: "",
		tags: [],
		createdBy: {},
	});
	const [document, setDocument] = useState<Document>();
	useEffect(() => {
		const folderDetails = async () => {
			if (f.id) {
				const { data } = await axios({
					method: "GET",
					url: `http://localhost:8090/api/folder/${f.id}`,
				});
				console.log(data);
				setDocument(null);
				setFolder(data);
			}
		};
		folderDetails();
	}, [f]);
	return (
		<>
			<h1>{folder.name}</h1>
			<div className={styles.container}>
				<div className={styles.info}>
					<Table size="lg" useZebraStyles={false}>
						<TableHead>
							<TableRow>
								<TableHeader>Nombre"</TableHeader>
								<TableHeader>Fecha de creación</TableHeader>
								<TableHeader>Etiquetas</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{folder.insideDocuments.map((tempDoc: Document) => (
								<TableRow
									key={tempDoc._id}
									onClick={() => {
										console.log(tempDoc);
										setDocument(tempDoc);
									}}
								>
									<TableCell>{tempDoc.title}</TableCell>
									<TableCell>{tempDoc.path}</TableCell>
									<TableCell>{tempDoc.tags}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<div className={styles.documentPreview}>
					{document ? (
						<iframe
							className={styles.inside}
							id="inlineFrameExample"
							title="Inline Frame Example"
							src={`http://localhost:8090/api/docs/preview/${document._id}`}
						></iframe>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
};

export default SelectedItem;
