import { Button, ControlGroup, FormGroup, IInputGroupState, InputGroup, Intent } from "@blueprintjs/core";
import { ITag } from "types";
import Query from "./Query";
import React from "react";
import { TagSelector } from "./TagSelect";

import QueryBuilderClasses from '../styles/QueryBuilder.module.css';

interface QueryBuilderProps {
    queries: Query[];
    onChangeQuery: (query: Query[]) => void;
    maxQueries?: number;
    noContent?: React.ReactNode;
}

const QueryBuilder = ({ queries = [], onChangeQuery, maxQueries, noContent }: QueryBuilderProps) => {
    // const tags =  useTags();
    const [selectedTags, setSelectedTags] = React.useState<ITag[]>([
        { name: "tag2", icon: "badge", color: "blue" },
        { name: "tag3", icon: "badge", color: "green" },
    ]);

    const headers = ["name", "description", "tags", "created_at", "updated_at"];
    const tags: ITag[] = [
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

        const newQueries = [query, ...queries];
        onChangeQuery(newQueries);
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
                        tags={tags}
                        selectedTags={selectedTags}
                        onChangeSelectedTags={setSelectedTags}
                    />

                </ControlGroup>
            </FormGroup>
            <FormGroup
                label="Add Query"
                subLabel="Add a query to filter the results"
            >
                <ControlGroup className={QueryBuilderClasses.queryGroup}>
                    <Query headers={headers} query={queryInput} onChangeQuery={setQueryInput} />
                    <Button icon="add" onClick={() => handleAddQuery(queryInput)} />
                </ControlGroup>
            </FormGroup>
            <FormGroup
                label="Queries"
                subLabel="The queries that will be used to filter the results"
            >{
                queries.length > 0 ? queries.map((q, i) => (
                        <ControlGroup key={i} className={QueryBuilderClasses.queryGroup}>
                            <Query
                                query={q}
                                onChangeQuery={(q) => {
                                    const newQueries = [...queries];
                                    newQueries[i] = q;
                                    onChangeQuery(newQueries);
                                }}
                                readonly
                            >

                            </Query>
                            <Button icon="cross" minimal onClick={() => handleRemoveQuery(i)}></Button>
                        </ControlGroup>
                    )) : renderNoContent()
                    
                    }
            </FormGroup>
        </div>
    )
}


export default QueryBuilder;