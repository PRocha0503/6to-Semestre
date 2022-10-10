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
import AreaSelector from "./usersTableCells/AreaSelector";
import RemoveArea from "./usersTableCells/RemoveArea";
import DeleteUser from "./usersTableCells/DeleteUser";
import MakeAdmin from "./usersTableCells/MakeAdmin";
import styles from "../styles/UsersTable.module.css";

export const UsersTable = ({ users, loading = false }: any) => {
	console.log(users);
	const [sortedIndexMap, setSortedIndexMap] = useState<number[]>([]);

	const renderColumns = useMemo(() => {
		return generateColumns(
			{
				data: users,
				sortedIndexMap,
				onChangeSortedIndex: setSortedIndexMap,
			},
			[
				// { name: "ID", key: "_id", type: CTypeNumber },
				{ name: "Usuario", key: "username", type: CTypeString },
				{ name: "Area", key: "areas", type: CTypeList, field: "name" },
				{
					name: "Agregar Area",
					key: "areas",
					type: CTypeCustom,
					render: ({ _id, ...user }: any) => {
						return <AreaSelector user={user} _id={_id} />;
					},
				},
				{
					name: "Quitar Area",
					key: "_id",
					type: CTypeCustom,
					render: ({ _id, ...user }: any) => {
						return <RemoveArea user={user} _id={_id} />;
					},
				},
				{
					name: "Borrar Usuario",
					key: "_id",
					type: CTypeCustom,
					render: ({ _id, ...user }: any) => {
						return <DeleteUser user={user} _id={_id} />;
					},
				},
				{
					name: "Hacer Admin",
					key: "_id",
					type: CTypeCustom,
					render: ({ _id, ...user }: any) => {
						return <MakeAdmin user={user} _id={_id} />;
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
			numRows={users.length}
			cellRendererDependencies={[sortedIndexMap]}
			loadingOptions={getLoadingOptions()}
			enableColumnResizing
			getCellClipboardData={(row, col) =>
				renderColumns[col].getClipboardData(row)
			}
			renderMode={RenderMode.BATCH}
			ref={ref}
			enableFocusedCell={true}
			columnWidths={renderColumns.map((c) => 200)}
			rowHeights={users.map(() => 40)}
		>
			{renderColumns.map((column) => column.getColumn())}
		</Table2>
	);
};
