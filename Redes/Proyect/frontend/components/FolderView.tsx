import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";

import DocumentsTable from "./DocumentsTable";
import LogTab from "./LogTab";

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

const FolderView = ({ folder, setDocument }: any) => {
	console.log(folder);
	return (
		<div className={styles.info}>
			<Tabs>
				<TabList aria-label="List of tabs">
					<Tab>Documentos</Tab>
					<Tab>Logs</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<DocumentsTable folder={folder} setDocument={setDocument} />
					</TabPanel>
					<TabPanel>
						<LogTab logs={folder.logs} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default FolderView;
