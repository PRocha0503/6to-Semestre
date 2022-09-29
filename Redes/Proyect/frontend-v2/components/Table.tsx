import { CTypeButton, CTypeDate, CTypeString, generateColumns } from "./Columns";
import React, { useMemo } from "react";
import { RenderMode, Table2, TableLoadingOption } from "@blueprintjs/table";
import { IDocument } from "types";


interface TableProps {
    documents: IDocument[]
    loading?: boolean
    onLogOpen?: (document: IDocument) => void
} 

export const Table = ({documents, loading = false, onLogOpen }: TableProps)=>{
    const [sortedIndexMap, setSortedIndexMap] = React.useState<number[]>([])
    const renderColumns = useMemo(() => {
        console.log("rendering columns")
        function test(el:any){
             onLogOpen?.(el)
        }
        return generateColumns(
            { 
                data: documents,
                sortedIndexMap,
                onChangeSortedIndex: setSortedIndexMap,            
            },
            [
                { name: "Title", key: "title", type: CTypeString },
                { name: "Expediente", key: "expediente", type: CTypeString},
                { name: "Folio", key: "folio", type: CTypeString},
                { name: "Created At", key: "createdAt", type: CTypeDate},
                { name: "Logs", key: "logs", type: CTypeButton, onClick: test},
            
            ]
        )

    }, [documents, setSortedIndexMap, sortedIndexMap, onLogOpen])
  
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
    <Table2 
        numRows={20}    
        cellRendererDependencies={[sortedIndexMap]}
        loadingOptions={getLoadingOptions()} 
        enableColumnResizing
        enableGhostCells
        getCellClipboardData={(row, col) => renderColumns[col].getClipboardData(row)}
        // onCopy={(e) => {console.log(ref.current)}}
        // onCompleteRender={() => {
        //     ref.current?.resizeRowsByApproximateHeight(() => "jjjj")
        // }}
        renderMode={RenderMode.BATCH}
        // ref={ref}
        >
        {renderColumns.map((column) => column.getColumn())}
    </Table2>
    )
}


