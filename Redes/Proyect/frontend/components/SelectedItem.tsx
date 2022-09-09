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

import FolderView from "./FolderView";

import styles from "../styles/DocumentPreview.module.scss";
import DocumentView from "./DocumentView";


const SelectedItem = ({ f }: any) => {
	const [folder, setFolder] = useState<Folder>({
		_id: "",
		name: "s",
		insideFolders: [],
		insideDocuments: [],
		path: "",
		tags: [],
		createdBy: {},
		logs: [],
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
				<FolderView folder={folder} setDocument={setDocument} />
				<div className={styles.documentPreview}>
					{document ? 
						<DocumentView document={document} /> : 
					<></>}
					
				</div>
			</div>
		</>
	);
};

export default SelectedItem;
