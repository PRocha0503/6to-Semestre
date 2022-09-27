import { Button, ControlGroup, FormGroup, IInputGroupState, InputGroup, Intent } from "@blueprintjs/core";
import { ITag, ITagForm } from "types";
import React, { useEffect } from "react";
import Query from "./Query";
import { TagSelector } from "./TagSelect";

import QueryBuilderClasses from '../styles/QueryBuilder.module.css';
import QueryTag from "./QueryTag";
import { useRouter } from "next/router";
import useTags from "@hooks/tags/useTags";

interface QueryBuilderProps {
    queries: Query[];
    onChangeQuery: (query: Query[]) => void;
    maxTags?: number;
    maxQueries?: number;
    noContent?: React.ReactNode;
    tags: ITagForm[];
    onChangeTags: (tags: ITagForm[]) => void;

}

const DEFAULT_QUERY: Query = {
    header: "title",
    operator: "eq",
    value: "",
}


const QueryBuilder = ({ queries = [], onChangeQuery, tags, onChangeTags, maxQueries,maxTags, noContent }: QueryBuilderProps) => {
    // const tags =  useTags();
    const router = useRouter()

    const headers = ["_id", "title", "folio", "expediente", "createdAt", "createdBy"];

    // fetch tags from area
    const { data, isLoading, isError, error } = useTags("Finanzas")
    
    const [ menuTags, setMenuTags ] = React.useState<ITagForm[]>([]);

    // transform tags to ITagForm
    useEffect(() => {
        const mappedTags: ITagForm[] = data?.tags.map((tag: ITag) => {
            return {
                name: tag.name,
                // icon: "area-of-interest", // TODO: get icon from tag
        }}) || [];

        setMenuTags(mappedTags);
    }, [data])

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
                <p>Ninguna consulta agregada</p>
            </div>
        )
    }


    const [queryInput, setQueryInput] = React.useState<Query>(DEFAULT_QUERY);

    return (
        <div className={QueryBuilderClasses.builder}>
            <FormGroup
                label="Tags"
                subLabel="Seleccionar etiquetas que se usaran para filtrar los documentos"
            >
                <ControlGroup>
                    <TagSelector
                        tags={menuTags}
                        selectedTags={tags}
                        onChangeSelectedTags={onChangeTags}
                    />
                </ControlGroup>
            </FormGroup>
            <FormGroup
                label="Añadir consulta"
                subLabel="Añadir una consulta para filtrar los resultados"
            >
                <ControlGroup className={QueryBuilderClasses.queryGroup}>
                    <Query headers={headers} query={queryInput} onChangeQuery={setQueryInput} onEnter={handleAddQuery}/>
                    <Button icon="add" onClick={() => handleAddQuery(queryInput)} />
                </ControlGroup>
            </FormGroup>
            <FormGroup
                label="Consultas"
                subLabel="Las consultas que se usarán para filtrar los resultados"
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