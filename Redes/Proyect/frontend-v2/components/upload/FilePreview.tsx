import { Button, FormGroup, NonIdealState } from "@blueprintjs/core";
import { Column, Table2, TableLoadingOption } from "@blueprintjs/table";
import { ItemRenderer, ItemRendererProps, Select2 } from "@blueprintjs/select";
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import useSheets, { Sheet } from "@hooks/csv/useSheets";
import { MenuItem2 } from "@blueprintjs/popover2";
import { generateColumnsSheet } from "./SheetColumn";
import HeaderSelector, { Header } from "./HeaderSelect";

interface IProps {
    file: File | null;
    previewItems: number
}

const SheetSelect = Select2.ofType<Sheet>();

const FilePreview: React.FC<IProps> = ({ file, previewItems }) => {
    const { sheets, isLoading, error } = useSheets(file, true);
    const [selectedSheet, setSelectedSheet] = useState<Sheet | null>(null);

    const getLoadingOptions = () => {
        const loadingOptions: TableLoadingOption[] = [];
        if (isLoading) {
            loadingOptions.push(TableLoadingOption.CELLS);
            loadingOptions.push(TableLoadingOption.COLUMN_HEADERS);
            loadingOptions.push(TableLoadingOption.ROW_HEADERS);
        }

        return loadingOptions;
    };


    const renderSheet: ItemRenderer<Sheet> = (item, props) => {
        return (
            <MenuItem2
                {...props.modifiers}
                key={item.name + "_" + sheets.indexOf(item)}
                text={item.name}
                shouldDismissPopover={true}
                roleStructure="listoption"
                selected={selectedSheet?.name === item.name}
                onClick={() => setSelectedSheet(item)}
            />
        );
    };

    const [ headers, setHeaders ] = useState<Header[]>([
        { name: "Nombre", selected: false, key: "title", column: -1 },
        { name: "# de Expediente", selected: false, key: "expediente_id", column: -1 },
        { name: "Folio", selected: false, key: "folio", column: -1 },
    ]);

    const headerSelection = useCallback((columnIndex: number, name: string) => {
        const getSelectedIndex = (): number => {
            const selectedHeader = headers.find((header) => header.selected && header.column === columnIndex);
            return selectedHeader ? headers.indexOf(selectedHeader) : -1;
        };

        return (
            <HeaderSelector
                headers={headers}
                column={columnIndex}
                selectedIndex={getSelectedIndex()}
                updateHeaderItem={(header) => {
                    setHeaders((prevHeaders) => {
                        const newHeaders = prevHeaders.map((h) => {
                            if (h.key === header.key) {
                                return {...header, column: header.selected ? columnIndex : -1};
                            }
                            return h;
                        });
                        
                        return newHeaders;
                    }
                        );
                } }          
            />
        );
    },[headers]);
        

    const renderColumns = useMemo(() => {
        if (!selectedSheet) {
            return [];
        }

        return generateColumnsSheet(selectedSheet, { renderHeaderCell: headerSelection } );
    }, [selectedSheet, headerSelection]);


    useEffect(() => {
        if (!isLoading && sheets.length > 0) {
            setSelectedSheet(sheets[0]);
        }

    }, [isLoading, sheets]);

    const getRowsLength = () => {
        return Math.min(selectedSheet?.data?.length || 0, previewItems)
    }

    const getTable = () => {
        if ((selectedSheet?.data?.length || 0) === 0) {
            return <NonIdealState title="No hay datos en la hoja"></NonIdealState>;
        }

        return (
            <Table2
                numRows={getRowsLength()}
                columnWidths={renderColumns.map((column) => 200)}
                rowHeights={Array(getRowsLength()).fill(50)}
                enableGhostCells
                getCellClipboardData={(row, col) => {
                    return selectedSheet?.data?.[row]?.[col].v || "";
                }}

            >
                {renderColumns.map((column, index) => (
                    column.getColumn()
                ))}
            </Table2>
        )
    }

    return (
        <div style={{
            minHeight: "15rem",
        }}>
            {!error ? isLoading ? (
                <Table2
                    numRows={5}
                    loadingOptions={getLoadingOptions()}
                >
                    <Column />
                    <Column />
                    <Column />
                    <Column />
                    <Column />
                </Table2>

            ) : (
                <div style={{
                    margin: "1rem",
                }}>
                    <FormGroup
                        label="Selecciona una hoja"
                        inline

                    >
                        <SheetSelect
                            items={sheets}
                            itemRenderer={renderSheet}
                            onItemSelect={setSelectedSheet}
                            activeItem={selectedSheet}
                            filterable={false}
                            resetOnClose={false}
                            resetOnQuery={false}
                            resetOnSelect={false}
                            popoverProps={{ minimal: true, canEscapeKeyClose: true, autoFocus: true }}
                            noResults={<em>No hay hojas disponibles</em>}
                        >
                            <Button text={selectedSheet?.name} rightIcon="double-caret-vertical" />
                        </SheetSelect>
                    </FormGroup>
                        {getTable()}
                </div>
            ) :
            <div>   Error: {error} </div>
            }
        </div>
    )

}

export default FilePreview;