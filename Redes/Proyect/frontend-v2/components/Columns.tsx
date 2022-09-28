import { Button, Classes, Icon, Intent, Menu, MenuItem } from "@blueprintjs/core"
import { Cell,Column, ColumnHeaderCell2, TruncatedFormat2, Utils } from "@blueprintjs/table";
import React, { useEffect } from "react";
import { IDocument } from "types";
import { type } from "os";

/**
 * Context for the table
 */
interface Context<T>{
    data: T[]
    sortedIndexMap: number[]
    onChangeSortedIndex: (inputs:number[]) => void
    index: number
    key: keyof T
    name: string
}

/**
 * Base class for all columns
 */
export abstract class BaseSortableColumn<K, T>{
    context: Context<K>

    constructor(context: Context<K>) {
       this.context = context
    }

    protected abstract renderCell(data: T | undefined, rowIndex: number): JSX.Element;
    protected abstract rank(n: T): number 

    public getClipboardData(rowIndex: number): string {
        const data = this.context.data[rowIndex]?.[this.context.key] || ""
        return String(data)
    }
    private sortColumn(comparator: (a: T, b: T) => number) {
        const sortedIndexMap = Utils.times(this.context.data.length, (i: number) => i);
        sortedIndexMap.sort((a: number, b: number) => {
            return comparator(this.context.data[a]?.[this.context.key] as T, this.context.data[b]?.[this.context.key] as T);
        });
        this.context.onChangeSortedIndex(sortedIndexMap);
    }
    private getCell(rowIndex: number, columnIndex: number): JSX.Element {
        const { sortedIndexMap } = this.context
        const sortedRowIndex = sortedIndexMap[rowIndex];
        const data : T | undefined = this.context.data[sortedRowIndex ?? rowIndex]?.[this.context.key] as T | undefined
        return this.renderCell(data, rowIndex);   
    }
    private compare(a: T, b: T): number {
        return (this.rank(a) - this.rank(b));
    }
    private renderMenu() {
        const sortAsc = () =>  this.sortColumn((a, b) => this.compare(a, b));
        const sortDesc = () => this.sortColumn((a, b) => this.compare(b, a));

        return <Menu> 
                <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Rank Desc" />
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Rank Asc" />
            </Menu>

    }

    private renderName(name: string) {
        return (
            <div style={{ lineHeight: "24px" }}>
                <div className={Classes.TEXT_LARGE}>
                    <strong>{name}</strong>
                </div>
                <div className={Classes.MONOSPACE_TEXT}>{this.context.key}</div>
            </div>
        );
    }

    public getColumn() {
            // render the column header cell
            const columnHeaderCellRenderer = () => <ColumnHeaderCell2 name={this.context.name} menuIcon={"chevron-down"} menuRenderer={this.renderMenu.bind(this)} nameRenderer={this.renderName.bind(this)} />;
            
            // render column
            return <Column
                cellRenderer={this.getCell.bind(this)}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={this.context.index}
                name={this.context.name}
            />
    };
}


/**
 * A sortable column that renders a string
 */
export class SortableColumnString<T> extends BaseSortableColumn<T, string>{
    renderCell(data: string | undefined, rowIndex: number): JSX.Element {
        return <Cell>{data ?? ""}</Cell>
    }

    rank(n: string): number {
        return n.length
    }

}

/**
 * A sortable column that renders a number
 */
export class SortableColumnNumber<T> extends BaseSortableColumn<T, number>{
    renderCell(data: number | undefined): JSX.Element {
        return <Cell>{data ?? ""}</Cell>
    }

    rank(n: number): number {
        return n
    }
}

/**
 *  A sortable column that renders a date
 */
export class SortableColumnDate<T> extends BaseSortableColumn<T, Date>{
    format(date: Date) {
        const localDateTime = new Date(date);
        localDateTime.setTime(localDateTime.getTime());
        const formattedDateTime = localDateTime.toLocaleString("en-US", {
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            month: "long",
            second: "2-digit",
            weekday: "long",
            year: "numeric",
        });

        return formattedDateTime;
    }
    renderCell(data: Date | undefined): JSX.Element {
        const date = data !== undefined ? this.format(data) : ""
        return <Cell><TruncatedFormat2 detectTruncation={true}>{date}</TruncatedFormat2></Cell>
    }

    rank(n: Date): number {
        return new Date(n).getTime()
    }

}

class SortableColumnButton<T> extends SortableColumnString<T>{
    context!: Context<T> & { onClick?: (item: T) => void; };
    constructor(context: Context<T> & {onClick?: (item: T) => void}) {
        super(context)
        context.onClick = context.onClick?.bind(this)
    }

    renderCell(data: string | undefined, rowIndex: number): JSX.Element {
        return data ? <Cell 
            ><Button 
            small
            style={
            {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",    
                fontWeight: "bold",
                fontSize: "12px",
                padding: "0px",
            }
        }
        onClick={() => {
            console.log("click")
            this.context.onClick?.(this.context.data[rowIndex])
        }} 
        intent={Intent.WARNING} className={Classes.INPUT_GHOST} 
        rightIcon={"menu-open"}>Open</Button></Cell> : <Cell></Cell>
    }
}

type CType = "string" | "number" | "date" | "button"

export const CTypeString: CType = "string"
export const CTypeNumber: CType = "number"
export const CTypeDate: CType = "date"
export const CTypeButton: CType = "button"

type GCBase<T> = {
    key: keyof T
    name: string
    type: CType
    onClick?: (item: T) => void
}
                                        
/**
 * generates a list of sortable columns
 * @param context the context for the columns
 * @param columns the columns to generate
 * @returns 
 */
export function generateColumns<T>(context:  Omit<Context<T>, "index" | "key" | "name">, columns: GCBase<T>[]): BaseSortableColumn<T, string | number | Date>[] {
    return columns.map((column, index) => {
        switch(column.type){
            case CTypeString:
                return new SortableColumnString<T>({...context, index, key: column.key, name: column.name})
            case CTypeNumber:
                return new SortableColumnNumber<T>({...context, index, key: column.key, name: column.name})
            case CTypeDate:
                return new SortableColumnDate<T>({...context, index, key: column.key, name: column.name})
            case CTypeButton:
                return new SortableColumnButton<T>({...context, index, key: column.key, name: column.name, onClick: column?.onClick})
            default:    
                return new SortableColumnString<T>({...context, index, key: column.key, name: column.name})
        }
    })
}