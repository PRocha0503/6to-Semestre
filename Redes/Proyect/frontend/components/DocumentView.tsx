import styles from "@/styles/DocumentPreview.module.scss";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import LogTab from "./LogTab";

const DocumentView = ({ document }: { document: Document }) => {
    return (
        <div className={styles.info}>
            <Tabs>
                <TabList aria-label="List of tabs">
                    <Tab>Preview</Tab>
                    <Tab>Logs</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className={styles.documentPreview}>
                            <iframe
                                className={styles.documentPreview}
                                id="inlineFrameExample"
                                title="Inline Frame Example"
                                src={`http://localhost:8090/api/docs/preview/${document._id}`}
                            ></iframe>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <LogTab logs={document.logs} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default DocumentView;