import axios from "axios";

import styles from "../styles/DocumentPreview.module.scss";

const SelectedItem = ({ document }: any) => {
	console.log(document);
	if (document.value == "FOLDER") {
		return <div>{document.name}</div>;
	} else {
		const previewDocument = async () => {
			// await axios({
			// 	method: "GET",
			// 	url: `http://localhost:8090/api/docs/downlaod/${document.id}`,
			// });
			// window.open(`http://localhost:8090/api/docs/preview/${document.id}`);
		};
		previewDocument();
		return (
			<div className={styles.container}>
				<iframe
					className={styles.documentPreview}
					id="inlineFrameExample"
					title="Inline Frame Example"
					width="600"
					height="1200"
					src={`http://localhost:8090/api/docs/preview/${document.id}`}
				></iframe>
				<div className={styles.info}></div>
			</div>
		);
	}
};

export default SelectedItem;
