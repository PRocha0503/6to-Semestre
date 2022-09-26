import { Cell,Column, ColumnHeaderCell2, Table2 } from "@blueprintjs/table";
import React from "react";


export type ICellLookup = (rowIndex: number, columnIndex: number) => any;
export type ISortCallback = (columnIndex: number, comparator: (a: any, b: any) => number) => void;

interface ICell<T>{
    value:T
}

interface SortableColumnProps<T> {
    index:number,
    name:string,
    cells:ICell<T>[]
} 


const SortableColumn:React.FC<SortableColumnProps<number>> = ({index,name,cells})=> {
        const cellRenderer = (rowIndex: number, columnIndex: number) => (
            <Cell>{cells[rowIndex].value}</Cell>
        );
        return (
            <Column
                cellRenderer={cellRenderer}
                key={index}
                name={name}
            />
        );
}

export default SortableColumn;