import axios from "axios";
import { useEffect, useState } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell,
	Tag,
} from "@carbon/react";

interface Document {
	_id: string;
	title: string;
	path: String;
	tags: [];
	createdBy: {};
	createdAt: Date;
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
	console.log(folder);
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
						<TableCell>
							{new Date(tempDoc.createdAt).toLocaleDateString("en-US")}
						</TableCell>
						<TableCell>
							{tempDoc.tags.map((tag: any) => {
								//chose random item from list
								const colors = [
									"red",
									"blue",
									"magenta",
									"purple",
									"teal",
									"cyan",
									"green",
									"gray",
								];
								const randomItem = Math.floor(Math.random() * colors.length);
								return (
									<Tag
										className="some-class"
										type={colors[randomItem]}
										size="sm"
										title="Clear Filter"
									>
										{tag}
									</Tag>
								);
							})}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default DocumentsTable;
