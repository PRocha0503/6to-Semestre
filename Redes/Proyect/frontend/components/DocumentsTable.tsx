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

const DocumentsTable = ({
	folder,
	setDocument,
}: {
	folder: Folder;
	setDocument: any;
}) => {
	return (
		<Table size="lg" useZebraStyles={false}>
			<TableHead>
				<TableRow>
					<TableHeader>Nombre</TableHeader>
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
	);
};

export default DocumentsTable;
