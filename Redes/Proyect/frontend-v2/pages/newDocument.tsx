import { NextPage } from "next";
import {
	Button,
	H5,
	Icon,
	IconSize,
	InputGroup,
	Intent,
	Menu,
	MenuItem,
	Spinner,
	Switch,
	Tag,
	Label,
} from "@blueprintjs/core";

import styles from "../styles/newDocument.module.css";

const NewDocument: NextPage = () => {
	return (
		<div>
			<h1 className="bp4-heading">H1 heading</h1>
			<div className={styles.textInput}>
				<Label as="h1">Titulo del documento</Label>
				<InputGroup
					large={true}
					fill={false}
					type="text"
					leftElement={<Icon icon="document" />}
					// onChange={this.handleTagChange}
					placeholder="Titulo"
					// rightElement={resultsTag}
					// small={true}
					// value={tagValue}
				/>
				<InputGroup
					large={true}
					fill={false}
					type="text"
					leftElement={<Icon icon="folder-close" />}
					// onChange={this.handleTagChange}
					placeholder="Expediente"
					// rightElement={resultsTag}
					// small={true}
					// value={tagValue}
				/>
			</div>
		</div>
	);
};

export default NewDocument;
