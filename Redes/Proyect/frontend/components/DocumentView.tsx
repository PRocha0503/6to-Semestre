import styles from "@/styles/DocumentPreview.module.scss";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import axios from "axios";
import { useEffect, useState } from "react";
import LogTab from "./LogTab";

const DocumentView = ({ document }: { document: Document }) => {
	const [documentData, setDocumentData] = useState<Document | null>(null);

	useEffect(() => {
		axios
			.get(`http://localhost:8090/api/docs/${document._id}`)
			.then((res) => {
				console.log(res.data);
				setDocumentData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [document]);

	return (
		<div className={styles.info}>
			<Tabs>
				<TabList aria-label="List of tabs">
					<Tab>Vista Previa</Tab>
					<Tab>Logs</Tab>
				</TabList>
				<TabPanels>
					<TabPanel className={styles.tabPanel}>
						<iframe
							className={styles.iframe}
							id="inlineFrame"
							title={document.title}
							src={`http://localhost:8090/api/docs/preview/${document._id}`}
						></iframe>
					</TabPanel>
					<TabPanel>
						<LogTab logs={documentData?.logs || []} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default DocumentView;
