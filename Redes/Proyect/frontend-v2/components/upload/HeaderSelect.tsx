import { Button, Intent, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, ItemRendererProps, Select2 } from "@blueprintjs/select";
import React, { useCallback } from "react";


export interface Header {
    name: string;
    selected: boolean;
    key: string;
    column: number
}

const HeaderSelect = Select2.ofType<Header>();

interface HeaderSelectProps {
    headers: Header[];
    updateHeaderItem: (header: Header) => void;
    column?: number;
    selectedIndex?: number;
}

const HeaderSelector = ({ headers, updateHeaderItem,  column, selectedIndex }: HeaderSelectProps) => {    

    const availableHeaders = useCallback(() => {
        const headr = headers.filter((header) => header.column === -1 || !header.selected);
        return headr.length
    }, [headers]);
    
	const itemRenderer: ItemRenderer<Header> = (header: Header, props : ItemRendererProps) => {
			return (
				<MenuItem
					{...props}
					text={header.name}
					selected={header.selected}
                    className="header-select-item"
                    roleStructure="listoption"
                    shouldDismissPopover={true}
                    onClick={() => {
                        if (headers[selectedIndex!]?.selected) {
                            const oldHeader = headers[selectedIndex!];
                            updateHeaderItem({...oldHeader, selected: false, column: -1});
                        }

                        const newHeader = {...header, selected: true, column: column!};
                        // set new header
                        updateHeaderItem(newHeader);
                    }
                }
				></MenuItem>
			);
	}

	return (
		<>
			<HeaderSelect
                items={headers}
                itemRenderer={itemRenderer}
                onItemSelect={(header) => {
                    // console.log(header);
                }}
                itemsEqual={(a, b) => a.key === b.key}
                filterable={false}
                popoverProps={{ minimal: true, className: "header-select-popover" }}
                noResults={<MenuItem disabled={true} text="No hay resultados" />}   
            >
                <Button
                    text={(selectedIndex !== null && selectedIndex !== -1) ? headers[selectedIndex!]?.name : 
                        (availableHeaders() > 0 ? "Seleccionar" : "...")}
                    className="header-select"
                    rightIcon="double-caret-vertical"
                    intent={availableHeaders() > 0 ? Intent.PRIMARY : (selectedIndex !== null && selectedIndex !== -1) ? Intent.SUCCESS : Intent.NONE}
                    fill
                    
                />
            </HeaderSelect>
        </>
    );
}

export default HeaderSelector;
