import { Classes, ControlGroup, IInputGroupState, InputGroup, Intent } from "@blueprintjs/core";
import React, { ChangeEvent } from "react";
import { ITag } from "types";
import { TagSelector } from "./TagSelect";

interface QueryBuilderProps {
    query: Query[];
    onChangeQuery: (query: Query[]) => void;
}


const QueryBuilder = ({ query, onChangeQuery }: QueryBuilderProps) => {
    // const tags =  useTags();
    const [ selectedTags, setSelectedTags ] = React.useState<ITag[]>([]);

    return (
        <div>
            <ControlGroup>
                <TagSelector 
                    tags={[
                        { name: "tag1", icon: "badge", color: "red" },
                    ]} 
                    selectedTags={selectedTags}
                    onChangeSelectedTags={setSelectedTags} 
                    dark/>
            </ControlGroup>
        </div>
    )
}


export default QueryBuilder;