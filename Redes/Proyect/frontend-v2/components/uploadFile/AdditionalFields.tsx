import { Button, InputGroup, Intent, Label } from "@blueprintjs/core";
import { useState } from "react";

interface Metadata {
	name: string;
	value: string;
}

interface Props {
	metadata: Metadata[];
	setMetadata: (metadata: any) => void;
}

const AdditionalFields = ({ metadata, setMetadata }: Props) => {
	const [newE, setNewE] = useState<Metadata>({ name: "", value: "" });
	return (
		<div
			style={{
				marginTop: "1rem",
			}}
		>
			<h3>Información Extra</h3>
			{metadata.map((m, i) => {
				return (
					<div
						key={i}
						style={{
							display: "flex",
							marginBottom: "0.5rem",
							height: "2rem",
							alignItems: "center",
						}}
					>
						<h4>
							{m.name}: {m.value}
						</h4>

						<div
							style={{
								display: "flex",
								marginLeft: "auto",
							}}
						>
							<Button
								icon="trash"
								intent={Intent.DANGER}
								small
								onClick={() => {
									setMetadata(metadata.filter((_, index) => index !== i));
								}}
							/>
						</div>
					</div>
				);
			})}
			<div
				style={{
					display: "flex",
					gap: "1rem",
				}}
			>
				<div>
					<Label>Nombre</Label>
					<InputGroup
						style={{}}
						onChange={(e) => {
							setNewE({ ...newE, name: e.target.value });
						}}
						placeholder="Nombre"
						value={newE.name}
					/>
				</div>
				<div>
					<Label>Valor</Label>
					<InputGroup
						style={{}}
						onChange={(e) => {
							setNewE({ ...newE, value: e.target.value });
						}}
						placeholder="Valor"
						value={newE.value}
					/>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "flex-end",
					}}
				></div>
			</div>
			<Button
				icon="add"
				onClick={() => {
					setMetadata([...metadata, newE]);
				}}
				disabled={newE.name === "" || newE.value === ""}
				style={{
					marginTop: "1rem",
				}}
			/>
		</div>
	);
};

export default AdditionalFields;
