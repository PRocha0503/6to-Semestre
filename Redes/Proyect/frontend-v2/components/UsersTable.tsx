import {
	CTypeNumber,
	CTypeString,
	CTypeList,
	generateColumns,
	CTypeButton,
	CTypeCustom,
} from "./Columns";
import React, { useMemo, useState, useRef } from "react";
import { RenderMode, Table2, TableLoadingOption } from "@blueprintjs/table";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { IDocument } from "types";
import AreaSelector from "./AreaSelector";

export const UsersTable = ({ users, loading = false }: any) => {
	const [sortedIndexMap, setSortedIndexMap] = useState<number[]>([]);
	const test = (el: any) => {
		console.log(el);
	};
	const renderColumns = useMemo(() => {
		console.log("rendering columns");

		return generateColumns(
			{
				data: users,
				sortedIndexMap,
				onChangeSortedIndex: setSortedIndexMap,
			},
			[
				{ name: "ID", key: "_id", type: CTypeNumber },
				{ name: "Username", key: "username", type: CTypeString },
				{ name: "Area", key: "areas", type: CTypeList, field: "name" },
				{
					name: "Add Area",
					key: "_id",
					type: CTypeCustom,
					render: () => {
						return <AreaSelector />;
					},
				},
			]
		);
	}, [users, setSortedIndexMap, sortedIndexMap]);

	const ref = useRef<Table2>(null);

	const getLoadingOptions = () => {
		const loadingOptions: TableLoadingOption[] = [];
		if (loading) {
			loadingOptions.push(TableLoadingOption.CELLS);
			loadingOptions.push(TableLoadingOption.COLUMN_HEADERS);
			loadingOptions.push(TableLoadingOption.ROW_HEADERS);
		}

		return loadingOptions;
	};

	return (
		<Table2
			numRows={4}
			cellRendererDependencies={[sortedIndexMap]}
			loadingOptions={getLoadingOptions()}
			enableColumnResizing
			getCellClipboardData={(row, col) =>
				renderColumns[col].getClipboardData(row)
			}
			renderMode={RenderMode.BATCH}
			ref={ref}
			enableFocusedCell={true}
		>
			{renderColumns.map((column) => column.getColumn())}
		</Table2>
	);
};
