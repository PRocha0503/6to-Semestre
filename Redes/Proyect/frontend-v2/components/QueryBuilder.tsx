import { Button, ControlGroup, FormGroup, IInputGroupState, InputGroup, Intent } from "@blueprintjs/core";
import { ITag } from "types";
import Query from "./Query";
import React from "react";
import { TagSelector } from "./TagSelect";

import QueryBuilderClasses from '../styles/QueryBuilder.module.css';
import QueryTag from "./QueryTag";

interface QueryBuilderProps {
    queries: Query[];
    onChangeQuery: (query: Query[]) => void;
    maxTags?: number;
    maxQueries?: number;
    noContent?: React.ReactNode;
    tags: ITag[];
    onChangeTags: (tags: ITag[]) => void;

}

const QueryBuilder = ({ queries = [], onChangeQuery, tags, onChangeTags, maxQueries,maxTags, noContent }: QueryBuilderProps) => {
    // const tags =  useTags();
  

    const headers = ["name", "description", "tags", "created_at", "updated_at"];
    const etags: ITag[] = [
        { name: "jaldjaslkjdlkasjdlkasjdlkasjdlkasjdlkajdklasjdklajslkj", icon: "badge", color: "red" },
        { name: "tag2", icon: "badge", color: "blue" },
        { name: "tag3", icon: "badge", color: "green" },
        { name: "tag4", icon: "badge", color: "yellow" },
    ]

    const handleRemoveQuery = (index: number) => {
        const newQueries = [...queries];
        newQueries.splice(index, 1);
        onChangeQuery(newQueries);
    }

    const handleAddQuery = (query: Query) => {
        if (maxQueries && queries.length >= maxQueries) {
            return;
        }

        // validate query
        if (query.header === "" || query.value === "") {
            return;
        }

        const newQueries = [...queries, query];
        onChangeQuery(newQueries);

        setQueryInput({...query, value: ""});
    }

    const renderNoContent = () => {
        if (noContent) {
            return noContent;
        }
        return (
            <div className={QueryBuilderClasses.noContent}>
                <p>No queries added yet</p>
            </div>
        )
    }

    const [queryInput, setQueryInput] = React.useState<Query>({
        header: "name",
        operator: "contains",
        value: "",
    });

    return (
        <div className={QueryBuilderClasses.builder}>
            <FormGroup
                label="Tags"
                subLabel="Select tags to filter by"
            >
                <ControlGroup>
                    <TagSelector
                        tags={etags}
                        selectedTags={tags}
                        onChangeSelectedTags={onChangeTags}
                    />

                </ControlGroup>
            </FormGroup>
            <FormGroup
                label="Add Query"
                subLabel="Add a query to filter the results"
            >
                <ControlGroup className={QueryBuilderClasses.queryGroup}>
                    <Query headers={headers} query={queryInput} onChangeQuery={setQueryInput} onEnter={handleAddQuery}/>
                    <Button icon="add" onClick={() => handleAddQuery(queryInput)} />
                </ControlGroup>
            </FormGroup>
            <FormGroup
                label="Queries"
                subLabel="The queries that will be used to filter the results"
            >
                <div className={QueryBuilderClasses.queryTags}>{
                    queries.length > 0 ? queries.map((q, i) => (
                        <ControlGroup key={i}>
                            <QueryTag query={q} onRemoveQuery={() => handleRemoveQuery(i)} />
                        </ControlGroup>
                    )) : renderNoContent()

                }
                </div>
            </FormGroup>
        </div>
    )
}


export default QueryBuilder;