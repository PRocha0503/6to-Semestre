import { HotkeysProvider } from "@blueprintjs/core";
import { Cell,Column, Table2 } from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";

const dollarCellRenderer = (rowIndex: number) => (
    <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
);
const euroCellRenderer = (rowIndex: number) => (
    <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
);
 
<Table2 numRows={10}>
    <Column name="Dollars" cellRenderer={dollarCellRenderer}/>
    <Column name="Euros" cellRenderer={euroCellRenderer} />
</Table2>