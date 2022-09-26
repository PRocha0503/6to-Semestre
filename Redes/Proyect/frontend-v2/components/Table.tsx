import { HotkeysProvider, Menu, MenuItem } from "@blueprintjs/core";
import { CellTower } from "@blueprintjs/icons/lib/esm/generated/16px/paths";
import { Cell,Column, ColumnHeaderCell2, Table2, Utils } from "@blueprintjs/table";
import { RowHeader } from "@blueprintjs/table/lib/esm/headers/rowHeader";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Retryer } from "react-query/types/core/retryer";
import { SortAsc } from "@blueprintjs/icons/lib/esm/generated/20px/paths";
import { createSortableColumnNumber, createSortableColumnString, SortableColumn, SortableColumnGenerator } from "./Columns";
import { IDocument } from "types";


interface IColumn{
    name:string,
    generateColumn: SortableColumnGenerator
    key:string
}

interface TableProps {
    documents: IDocument[]
} 

export const Table = ({documents}: TableProps)=>{


    const [sortedIndexMap, setSortedIndexMap] = React.useState<number[]>([])
 
    const [columns,setColumns]= React.useState<IColumn[]>([{key:"expediente", name:"No.Expediente", generateColumn: createSortableColumnString},{key:"folio", name:"No.Folio", generateColumn: createSortableColumnString},{key:"area", name:"Area", generateColumn: createSortableColumnString}]);
    const renderColumns = columns.map((value,index)=>{
        return value.generateColumn(value.key,index,{sortedIndexMap,documents,setSortedIndex:setSortedIndexMap}).getColumn(index,value.name)
    })



    useEffect(()=>{
        console.log(sortedIndexMap)
    },
    [sortedIndexMap])

    return (
    <Table2 numRows={documents.length} cellRendererDependencies={[sortedIndexMap]}>
    {renderColumns}

    </Table2>
    )
}


