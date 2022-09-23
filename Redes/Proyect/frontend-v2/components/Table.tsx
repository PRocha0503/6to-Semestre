import { HotkeysProvider } from "@blueprintjs/core";
import { Cell,Column, Table2 } from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";

interface TableProps {
    document: IDocument[]
} 

export const Table = (props: TableProps)=>{
    const dollarCellRenderer = (rowIndex: number) => (
        <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
    );
    const euroCellRenderer = (rowIndex: number) => (
        <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
    );
    return (
    <Table2 numRows={10}>
    <Column name="No.Expediente" cellRenderer={dollarCellRenderer}/>
    <Column name="No. Folio" cellRenderer={euroCellRenderer} />
    </Table2>
    )
}


