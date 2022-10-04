import { NextPage } from "next";
import {
	Button,
	H5,
	Icon,
	IconSize,
	InputGroup,
	FileInput,
	Intent,
	Menu,
	MenuItem,
	Spinner,
	Switch,
	Tag,
	Label,
	AnchorButton,
} from "@blueprintjs/core";

import { DateInput } from "@blueprintjs/datetime";


import styles from "../styles/newDocument.module.css";

const NewDocument: NextPage = () => {
	return (
		<div>
			<h1 className="bp4-heading">Subir Archivo	</h1>
			<div className={styles.textInputs}>
				<Label as="h1">Los apartados marcados con * son obligatorios</Label>

				<div className={styles.textInput}>
					<FileInput
						disabled={false} 
						text="Escoger archivo..."  
						typeof="file.pdf"
					/>
				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					fill={false}
					type="text"
					leftElement={<Icon icon="document" />}
					// onChange={this.handleTagChange}
					placeholder="Titulo*"
					// rightElement={resultsTag}
					// small={true}
					// value={tagValue}
				/>
				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					fill={false}
					type="text"
					leftElement={<Icon icon="folder-close" />}
					// onChange={this.handleTagChange}
					placeholder="Expediente*"
					// rightElement={resultsTag}
					// small={true}
					// value={tagValue}
				/>
				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					fill={false}
					type="folio"
					leftElement={<Icon icon="numerical" />}
					placeholder="Folio*"
				/>
				</div>

				<div className={styles.textInput}>
				<InputGroup
					//TODO cambiar el tipo de input a DateInput2
					large={true}
					fill={false}
					type="text"
					leftElement={<Icon icon="folder-close" />}
					// onChange={this.handleTagChange}
					placeholder="Fecha*"
					// rightElement={resultsTag}
					// small={true}
					// value={tagValue}
				/>
				</div>

				<div className={styles.textInput}>
				<DateInput
    				formatDate={date => date.toLocaleString()}
    				parseDate={str => new Date(str)}
    				placeholder="M/D/YYYY"
				/>

				</div>

				<div className={styles.textInput}>
				<InputGroup
					large={true}
					fill={false}
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
				/>
				</div>
			</div>
		</div>
	);
};

export default NewDocument;
