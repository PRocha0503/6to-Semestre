import { Menu, MenuItem } from "@blueprintjs/core"
import { Cell,Column, ColumnHeaderCell2, Table2, Utils } from "@blueprintjs/table";


export interface SortableColumn<T>{
    getColumn: (index:number, name:string)=> JSX.Element
    compare: (a:T,b:T) => number
    rank: (n:T) => number 
    renderMenu: () => JSX.Element
    index: number
    key:string
}

export type SortableColumnGenerator = (key:string,index:number,ctx:{documents:IDocument[],setSortedIndex:(inputs:number[])=>void, sortedIndexMap: number[]})=>SortableColumn<string>

const getCellData = (key:string,sortedIndexMap:number[],row:number,dcmts:IDocument[]) =>{
    const sortedRowIndex = sortedIndexMap[row];
    if (sortedRowIndex != null) {
        row = sortedRowIndex;
    }
    return dcmts[row][key] || ""
}


const sortColumn = (key:keyof IDocument, comparator: (a: any, b: any) => number, callback:(inputs:number[])=> void, documents:IDocument[]) => {

    const sortedIndexMp = Utils.times(documents.length, (i: number) => i);
    sortedIndexMp.sort((a: number, b: number) => {
        return comparator(documents[a][key], documents[b][key]);
    });
    callback(sortedIndexMp);
};

export function createSortableColumnNumber (key:string,index:number,ctx:{documents:IDocument[],setSortedIndex:(inputs:number[])=>void, sortedIndexMap: number[]}):SortableColumn<number>{
    return {
        index,
        key,
        getColumn(index, name){
            const cellRenderer = (rowIndex: number, columnIndex: number) => (
                <Cell>{getCellData(this.key,ctx.sortedIndexMap,rowIndex,ctx.documents)}</Cell>
            )
            const columnHeaderCellRenderer = () => <ColumnHeaderCell2 name={name} menuRenderer={this.renderMenu.bind(this)} />;
            return <Column
                cellRenderer={cellRenderer}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={index}
                name={name}
            />
        },
        compare(a,b){
            return (a-b)
        },
        rank(n){
            return n
        },
        renderMenu(){
            const sortAsc = () => sortColumn(this.key, (a, b) => this.compare(a, b),ctx.setSortedIndex, ctx.documents);
            const sortDesc = () => sortColumn(this.key, (a, b) => this.compare(b, a),ctx.setSortedIndex, ctx.documents);
            return <Menu> <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Rank Desc" />
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Rank Asc" />
            </Menu>
        }
    }
}


export function createSortableColumnDate (key:string,index:number,ctx:{documents:IDocument[],setSortedIndex:(inputs:number[])=>void,sortedIndexMap: number[]}):SortableColumn<Date>{
    return {
        getColumn(index,name){
            const cellRenderer = (rowIndex: number, columnIndex: number) => (
                <Cell>{getCellData(this.key,ctx.sortedIndexMap,rowIndex,ctx.documents)}</Cell>
            )
            const columnHeaderCellRenderer = () => <ColumnHeaderCell2 name={name} menuRenderer={this.renderMenu.bind(this)} />;
            return <Column
                cellRenderer={cellRenderer}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={index}
                name={name}
            />
        },
        compare(a,b){
            return (this.rank(a)-this.rank(b))
        },
        rank(n){
            return n.getTime()
        },
        renderMenu(){
            const sortAsc = () => sortColumn(this.key, (a, b) => this.compare(a, b),ctx.setSortedIndex, ctx.documents);
            const sortDesc = () => sortColumn(this.key, (a, b) => this.compare(b, a),ctx.setSortedIndex, ctx.documents);
            return <Menu> <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Rank Desc" />
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Rank Asc" />
            </Menu>
        },
        index,
        key
    }
}

export function createSortableColumnString (key:string,index:number,ctx:{documents:IDocument[],setSortedIndex:(inputs:number[])=>void,sortedIndexMap: number[]}):SortableColumn<string>{
    return{
        getColumn(index,name){
            const cellRenderer = (rowIndex: number, columnIndex: number) => (
                <Cell>{getCellData(this.key,ctx.sortedIndexMap,rowIndex,ctx.documents)}</Cell>
            )
            const columnHeaderCellRenderer = () => <ColumnHeaderCell2 name={name} menuRenderer={this.renderMenu.bind(this)} />;
            return <Column
                cellRenderer={cellRenderer}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={index}
                name={name}
            />
        },
        compare(a,b){
            console.log(a)
            return a.localeCompare(b)
        },
        rank(n){
            return 0
        },
        renderMenu(){
            const sortAsc = () => sortColumn(this.key, (a, b) => this.compare(a, b),ctx.setSortedIndex, ctx.documents);
            const sortDesc = () => sortColumn(this.key, (a, b) => this.compare(b, a),ctx.setSortedIndex, ctx.documents);
            return <Menu> <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Rank Desc" />
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Rank Asc" />
            </Menu>
        },
        index,
        key
    }
    
}

