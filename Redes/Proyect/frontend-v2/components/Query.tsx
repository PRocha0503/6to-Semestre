import { Button, ControlGroup, FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import React from "react";

import QueryClasses from '../styles/Query.module.css';

const OperatorSelect = Select2.ofType<ReadableOperator>();
const HeaderSelect = Select2.ofType<string>();

interface QueryProps {
    query: ReadableQueryOperator;
    onChangeQuery: (query: ReadableQueryOperator) => void;
    onEnter?: (query: ReadableQueryOperator) => void;
    headers?: string[];
    readonly?: boolean
}

const Query: React.FC<QueryProps> = ({ query, onChangeQuery, readonly, onEnter, headers=[] }) => {
    const operators: ReadableOperator[] = [
        "empieza con",
        "contiene",
        "termina con", 
        "es igual que" ,
        "es distinto A" ,
        "es mayor que" ,
        "es mayor o igual que", 
        "es menor que" ,
        "es menor igual que", 
        "existe" 
    ]
    
    const headerPredicate = (query: string, item: string) => item.toLowerCase().indexOf(query.toLowerCase()) >= 0
    const operatorPredicate = (query: string, item: ReadableOperator) => item.toLowerCase().indexOf(query.toLowerCase()) >= 0

    const headerRenderer: ItemRenderer<string> = (item, props) => {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem2
                {...props.modifiers}
                key={item}
                text={item}
                shouldDismissPopover={true}
                onClick={() => onChangeQuery({ ...query, header: item })}
            />
        );
    }

    const operatorRenderer: ItemRenderer<ReadableOperator> = (item, props) => {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }
        
        return (
            <MenuItem2
                {...props.modifiers}
                key={item}
                text={item}
                shouldDismissPopover={true}
                onClick={() => onChangeQuery({ ...query, operator: item })}
            />
        );
    }

    return (
          <ControlGroup className={QueryClasses.query}>
                <FormGroup
                    label="El encabezado"
                    disabled={readonly}
                >
                    <HeaderSelect
                        items={headers}
                        itemPredicate={headerPredicate}
                        itemRenderer={headerRenderer}
                        onItemSelect={(item) => onChangeQuery({ ...query, header: item })}
                        itemsEqual={(a, b) => a === b}
                        noResults={<MenuItem2 disabled={true} text="No hay resultados." />}
                        resetOnClose={false}
                        resetOnQuery={false}
                        resetOnSelect={false}
                        disabled={readonly}
                        className={QueryClasses.select}
                        
                        itemDisabled={() => readonly || false}
                        // initialContent={<MenuItem2 disabled={true} text="Type to search..." />}
                        popoverProps={{ minimal: true, canEscapeKeyClose: true, autoFocus: true }}
                    >
                        <Button text={query.header ?? headers[0]} rightIcon="double-caret-vertical" disabled={readonly} />
                    </HeaderSelect>
                </FormGroup>
                <FormGroup
                    label="Tiene la condición"
                    disabled={readonly}
                >
                    <OperatorSelect
                        fill
                        items={operators}
                        itemPredicate={operatorPredicate}
                        itemRenderer={operatorRenderer}
                        filterable={false}
                        className={QueryClasses.select}
                        onItemSelect={(operator) => onChangeQuery({ ...query, operator: operator })}
                        popoverProps={{ minimal: true, canEscapeKeyClose: true, autoFocus: true }}
                        disabled={readonly}
                    >
                        <Button text={query.operator ?? operators[0]} rightIcon="double-caret-vertical" disabled={readonly} />
                    </OperatorSelect>
                </FormGroup>
                <FormGroup
                    label="Con el valor"
                    disabled={readonly}
                >
                    <InputGroup
                        placeholder="Valor"
                        value={query.value ?? ""}
                        onChange={(e) => onChangeQuery({ ...query, value: e.target.value })}
                        disabled={readonly}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onEnter?.(query);
                            }
                        }}
                    >
                    </InputGroup>
                </FormGroup>
            </ControlGroup>
    
    )
}


export default Query;