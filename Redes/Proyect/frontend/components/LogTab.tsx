import { DataTable, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Pagination } from "@carbon/react";
import type { Header } from "@carbon/react";
import { useState } from "react";
interface User {
    username: string;
}

interface Log {
    date: Date
    user: User
}

interface LogProps {
    logs: Log[]
}

interface Row {
    id: string
    date: string
    user: string
}

interface Header {
    key: string
    header: string
}

const LogTab = ({ logs }: LogProps) => {
    const headers: Header[] = [{ key: "date", header: "Date" }, { key: "user", header: "User" }];
    const rows: Row[] = logs.map((log, key) => { return { id: key.toString(), date: log.date.toISOString(), user: log.user.username } });
    
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [currentRows, setCurrentRows] = useState(rows.slice(0, 10));

    const handlePagination = ({ page, pageSize }: { page: number, pageSize: number }) => {
        setPage(page);
        setPageSize(pageSize);
        setCurrentRows(rows.slice((page - 1) * pageSize, page * pageSize));
    }

    return (
        <div>
            <DataTable rows={currentRows} headers={headers} isSortable>
                {({ rows, headers, getHeaderProps, getRowProps, getTableProps }: any) => (
                    <TableContainer title="Logs" description="historial de acceso">
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    {headers.map((header: any) => (
                                        <TableHeader key={header.key} {...getHeaderProps({ header })}>
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
            <Pagination totalItems={logs.length} pageSizes={[10, 20, 30, 40, 50]} pageSize={pageSize} page={page} onChange={handlePagination} />
        </div>
    )
}
export default LogTab