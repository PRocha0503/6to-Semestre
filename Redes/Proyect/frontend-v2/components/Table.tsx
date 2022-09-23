import { Cell, Column, Table } from "@blueprintjs/table";
 
const dollarCellRenderer = (rowIndex: number) => (
    <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
);
const euroCellRenderer = (rowIndex: number) => (
    <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
);
 
<Table numRows={10}>
    <Column name="Dollars" cellRenderer={dollarCellRenderer}/>
    <Column name="Euros" cellRenderer={euroCellRenderer} />
</Table>