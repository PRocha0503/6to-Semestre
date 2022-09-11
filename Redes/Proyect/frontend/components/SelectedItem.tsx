import axios from "axios";
import { useEffect, useState } from "react";

import FolderView from "./FolderView";
import DocumentView from "./DocumentView";

import styles from "../styles/HomeContent.module.scss";


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
	const [document, setDocument] = useState<Document | null>();
	useEffect(() => {
		const cancelToken = axios.CancelToken.source();
		
		const folderDetails = async () => {
			if (f.id) {
				const { data } = await axios({
					method: "GET",
					url: `http://localhost:8090/api/folder/${f.id}`,
					cancelToken: cancelToken.token,
				},);
				setDocument(null);
				setFolder(data);
			}
		};
		
		folderDetails();

		return () => {
			cancelToken.cancel();
		}

	}, [f]);
	return (
		<div className={styles.selectedContainer}>
			<h1>{folder.name}</h1>
			<div className={styles.contentContainer}>
				<FolderView folder={folder} setDocument={setDocument} />
				<div className={styles.documentPreview}>
					{document ? 
						<DocumentView document={document} /> : 
					<></>}
					
				</div>
			</div>
		</div>
	);
};

export default SelectedItem;
