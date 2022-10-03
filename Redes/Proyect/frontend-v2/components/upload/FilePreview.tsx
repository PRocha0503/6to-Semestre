import { Button, FormGroup, NonIdealState } from "@blueprintjs/core";
import { Column, Table2, TableLoadingOption } from "@blueprintjs/table";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useEffect, useMemo, useState } from "react";
import useSheets, { Sheet } from "@hooks/csv/useSheets";
import { MenuItem2 } from "@blueprintjs/popover2";
import { generateColumnsSheet } from "./SheetColumn";

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

    const renderColumns = useMemo(() => {
        if (!selectedSheet) {
            return [];
        }

        return generateColumnsSheet(selectedSheet);
    }, [selectedSheet]);


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
            height: "15rem",
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