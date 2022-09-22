import { Classes, ControlGroup, IInputGroupState, InputGroup, Intent } from "@blueprintjs/core";
import React, { ChangeEvent } from "react";
import { TagSelector } from "./TagSelect";

interface QueryBuilderProps {
    query: Query[];
    onChangeQuery: (query: Query[]) => void;
}


const QueryBuilder = ({ query, onChangeQuery }: QueryBuilderProps) => {
    const [ tags, setTags ] = React.useState<string[]>([]);
    const [ tag, setTag ] = React.useState<string>("");

    return (
        <div>
            <ControlGroup>
                <TagSelector/>
            </ControlGroup>
        </div>
    )
}


export default QueryBuilder;