import { Cell, Column, ColumnHeaderCell2, ColumnProps, TruncatedFormat2 } from "@blueprintjs/table";
import type { Sheet, SheetCell } from "@hooks/csv/useSheets";
import { BaseSortableColumn } from "@components/Columns";
import { Classes } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";

interface SheetColumnProps<T> {
    index: number;
    name: string;
    data: T[][];
}

/**
 * Column that manages data from a matrix and its not sortable
 */
abstract class MatrixColumn<T> implements SheetColumnProps<T> {
    index: number;
    data: T[][];
    name: string;

    constructor(index: number, name: string, data: T[][]) {
        this.index = index;
        this.name = name;
        this.data = data;
    }

    protected abstract renderCell(rowIndex: number, columnIndex: number): JSX.Element;

    public getClipboardData(rowIndex: number, columnIndex: number): string {
        const data = this.data[rowIndex][columnIndex];
        return String(data);
    }

    private renderName(name: string) {
        return (
            <Cell style={{ lineHeight: "24px" }}>
                <div className={Classes.TEXT_LARGE}>
                    <strong><TruncatedFormat2 >{name ? name : "Sin Titulo"}</TruncatedFormat2></strong>
                </div>
            </Cell>
        );
    }

    protected abstract renderHeader(columnIndex: number): JSX.Element;

    public getColumn() {
        // render the column header cell
        let columnHeaderCellRenderer = (column: number) => (
            <ColumnHeaderCell2
                name={this.name}
                menuIcon={"chevron-down"}
                nameRenderer={this.renderName.bind(this)}
            />
        );
        
        // get header cell
        columnHeaderCellRenderer = this.renderHeader ? this.renderHeader.bind(this) : columnHeaderCellRenderer;
        

        // render column
        return (
            <Column
                cellRenderer={this.renderCell.bind(this)}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={this.index}
                name={this.name}
            />
        );
    }
}


interface SheetBaseColumnProps {
    renderHeaderCell: (columnIndex: number, name: string) => void;
}

/**
 * A columnn from a sheet
 */
export class SheetBaseColumn extends MatrixColumn<SheetCell> {
    extra: SheetBaseColumnProps
    selectedColumn: number | null;

    constructor(index: number, name: string, data: SheetCell[][], extra: SheetBaseColumnProps) {
        super(index, name, data);
        this.extra = extra;
        
        this.selectedColumn = null;

    }


    protected renderHeader(columnIndex: number): JSX.Element {
        return (
            <ColumnHeaderCell2
                name={this.name}
                menuIcon={"chevron-down"}
            >
                {this.extra.renderHeaderCell(columnIndex, this.name)}
            </ColumnHeaderCell2>
        );
        
    }
    
    protected renderCell(rowIndex: number, columnIndex: number): JSX.Element {
        const dta = this.data[rowIndex][columnIndex];

        if (dta === undefined) {
            return <Cell></Cell>;
        }

        switch (dta.t) {
            case "s":
            case "n":
            case "b":
                return <Cell>{dta.v}</Cell>;
            case "d":
                return <Cell>{(dta?.v as Date)?.toISOString() || dta.v}</Cell>;
            default:
                return <Cell></Cell>;
        }
    }
}

/**
 *  Generates columns from a sheet
 * @param sheet
 * @returns
 */
export function generateColumnsSheet(sheet: Sheet, extra: SheetBaseColumnProps): SheetBaseColumn[] {
    const columns: SheetBaseColumn[] = [];
    for (let i = 0; i < (sheet?.data?.length || 0); i++) {
        const column = new SheetBaseColumn(i, sheet?.headers[i] || "", sheet?.data || [], extra);
        columns.push(column);
    }
    return columns;
}