import {
	CTypeButton,
	CTypeCustom,
	CTypeDate,
	CTypeString,
	generateColumns,
} from "./Columns";
import { Tag } from "@blueprintjs/core";
import React, { useMemo } from "react";
import {
	Cell,
	RenderMode,
	Table2,
	TableLoadingOption,
} from "@blueprintjs/table";
import { IDocument } from "types";
import UploadFile from "./UploadFileModal";
import UploadFileModal from "./UploadFileModal";
import useDownloadDocument from "@hooks/document/useDownloadDocument";
import axios from "axios";

interface TableProps {
	documents: IDocument[];
	loading?: boolean;
	onLogOpen?: (document: IDocument) => void;
	onDetOpen?: (document: IDocument) => void;
}

export const Table = ({
	documents,
	loading = false,
	onLogOpen,
	onDetOpen,
}: TableProps) => {
	const [sortedIndexMap, setSortedIndexMap] = React.useState<number[]>([]);
	const [uploadFile, setUploadFile] = React.useState<string | null>(null);

	const renderColumns = useMemo(() => {
		function test(el: any) {
			onLogOpen?.(el);
		}
		function openDatails(el: any) {
			onDetOpen?.(el);
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
					name: "Area",
					key: "area",
					type: CTypeCustom,
					render: (c: any) => {
						return c.area.name;
					},
				},
				{
					name: "Logs",
					key: "logs",
					type: CTypeButton,
					onClick: test,
					icon: "menu-open",
					text: "",
					color: "#C1A0F8",
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
					color: "#FFDBA4",
					disabled: (item: IDocument) => {
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
					color: "#C1EFFF",
					disabled: (item: IDocument) => item.hasFile,
				},
				{
					name: "Detalles",
					key: "_id",
					type: CTypeButton,
					onClick: openDatails,
					icon: "send-to",
					text: "",
					color: "grey",
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
				numRows={documents.length}
				cellRendererDependencies={[sortedIndexMap]}
				loadingOptions={getLoadingOptions()}
				enableColumnResizing
				// enableGhostCells
				getCellClipboardData={(row, col) =>
					renderColumns[col].getClipboardData(row)
				}
				// onCopy={(e) => {console.log(ref.current)}}
				// onCompleteRender={() => {
				//     ref.current?.resizeRowsByApproximateHeight(() => "jjjj")
				// }}
				renderMode={RenderMode.BATCH}
				// ref={ref}
				rowHeights={documents.map((d) => (d.hasFile ? 50 : 30))}
				className="table"
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
