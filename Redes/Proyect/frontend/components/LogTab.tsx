import {
	DataTable,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	Pagination,
} from "@carbon/react";
import type { Header } from "@carbon/react";
import { useEffect, useState } from "react";
interface LogProps {
	logs: Log[];
}

interface Row {
	id: string;
	date: string;
	user: string;
}

interface Header {
	key: string;
	header: string;
}

const LogTab = ({ logs }: LogProps) => {
	if (!logs) {
		return <div>No hay logs</div>;
	}

	const headers: Header[] = [
		{ key: "date", header: "Fecha" },
		{ key: "user", header: "Usuario" },
		{ key: "method", header: "Metodo" },
		{ key: "endpoint", header: "Punto" },
	];

	const [rows, setRows] = useState<Row[]>([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [currentRows, setCurrentRows] = useState<Row[]>([]);

	useEffect(() => {
		const logsMapped = logs.map((log: Log) => ({
			id: log._id,
			date: new Date(log.date).toLocaleDateString("en-US"),
			user: log.user.username,
			method: log.method,
			endpoint: log.endpoint,
		}));

		setRows(logsMapped);
		setCurrentRows(logsMapped.slice((page - 1) * pageSize, page * pageSize));
	}, [logs]);

	const handlePagination = ({
		page,
		pageSize,
	}: {
		page: number;
		pageSize: number;
	}) => {
		setPage(page);
		setPageSize(pageSize);
		setCurrentRows(rows.slice((page - 1) * pageSize, page * pageSize));
	};

	return (
		<div>
			<DataTable rows={currentRows} headers={headers} isSortable>
				{({
					rows,
					headers,
					getHeaderProps,
					getRowProps,
					getTableProps,
				}: any) => (
					<TableContainer title="Logs" description="historial de acceso">
						<Table {...getTableProps()}>
							<TableHead>
								<TableRow>
									{headers.map((header: any) => (
										<TableHeader
											key={header.key}
											{...getHeaderProps({ header })}
										>
											{header.header}
										</TableHeader>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row: any) => (
									<TableRow key={row.id} {...getRowProps({ row })}>
										{row.cells.map((cell: any) => (
											<TableCell key={cell.id}>{cell.value}</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</DataTable>
			<Pagination
				totalItems={rows.length}
				pageSizes={[5, 10, 20, 30, 40, 50]}
				pageSize={pageSize}
				page={page}
				onChange={handlePagination}
			/>
		</div>
	);
};
export default LogTab;
