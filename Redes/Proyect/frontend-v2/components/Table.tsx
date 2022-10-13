import {
	CTypeButton,
	CTypeDate,
	CTypeString,
	generateColumns,
} from "./Columns";
import React, { useMemo } from "react";
import { RenderMode, Table2, TableLoadingOption } from "@blueprintjs/table";
import { IDocument } from "types";
import UploadFile from "./UploadFileModal";
import UploadFileModal from "./UploadFileModal";
import useDownloadDocument from "@hooks/document/useDownloadDocument";
import axios from "axios";

interface TableProps {
	documents: IDocument[];
	loading?: boolean;
	onLogOpen?: (document: IDocument) => void;
}

export const Table = ({
	documents,
	loading = false,
	onLogOpen,
}: TableProps) => {
	const [sortedIndexMap, setSortedIndexMap] = React.useState<number[]>([]);
	const [uploadFile, setUploadFile] = React.useState<number | null>(null);

	const renderColumns = useMemo(() => {
		console.log("rendering columns");
		function test(el: any) {
			onLogOpen?.(el);
		}

		return generateColumns(
			{
				data: documents,
				sortedIndexMap,
				onChangeSortedIndex: setSortedIndexMap,
			},
			[
				{ name: "Titulo", key: "title", type: CTypeString },
				{ name: "Expediente", key: "expediente", type: CTypeString },
				{ name: "Folio", key: "folio", type: CTypeString },
				{ name: "Fecha de Creación", key: "createdAt", type: CTypeDate },
				{
					name: "Logs",
					key: "logs",
					type: CTypeButton,
					onClick: test,
					icon: "menu-open",
					text: "",
					color: "blue",
				},
				{
					name: "Descargar",
					key: "_id",
					type: CTypeButton,
					onClick: async (el) => {
						const { data } = await axios.get(
							"http://localhost:8090/api/docs/download/" + el._id,
							{
								withCredentials: true,
								responseType: "blob",
							}
						);
						let blob = new Blob([data], { type: "application/pdf" }),
							url = window.URL.createObjectURL(blob);

						window.open(url);
					},
					icon: "download",
					text: "",
					color: "none",
					disabled: (item: IDocument) => {
						console.log(item.hasFile);
						return !item.hasFile;
					},
				},
				{
					name: "Subir Documento",
					key: "_id",
					type: CTypeButton,
					onClick: ({ _id }) => setUploadFile(_id),
					icon: "upload",
					text: "",
					color: "green",
					disabled: (item: IDocument) => item.hasFile,
				},
			]
		);
	}, [documents, setSortedIndexMap, sortedIndexMap, onLogOpen]);

	const getLoadingOptions = () => {
		const loadingOptions: TableLoadingOption[] = [];
		if (loading) {
			loadingOptions.push(TableLoadingOption.CELLS);
			loadingOptions.push(TableLoadingOption.COLUMN_HEADERS);
			loadingOptions.push(TableLoadingOption.ROW_HEADERS);
		}

		return loadingOptions;
	};

	// const ref = React.useRef<Table2>(null)

	return (
		<>
			<Table2
				numRows={300}
				cellRendererDependencies={[sortedIndexMap]}
				loadingOptions={getLoadingOptions()}
				enableColumnResizing
				enableGhostCells
				getCellClipboardData={(row, col) =>
					renderColumns[col].getClipboardData(row)
				}
				// onCopy={(e) => {console.log(ref.current)}}
				// onCompleteRender={() => {
				//     ref.current?.resizeRowsByApproximateHeight(() => "jjjj")
				// }}
				renderMode={RenderMode.BATCH}
				// ref={ref}
			>
				{renderColumns.map((column) => column.getColumn())}
			</Table2>
			<UploadFileModal
				_id={uploadFile}
				onClose={setUploadFile}
				addToast={() => {}}
			/>
		</>
	);
};
