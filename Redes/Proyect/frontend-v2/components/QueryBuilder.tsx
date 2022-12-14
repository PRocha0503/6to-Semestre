import {
	Button,
	ControlGroup,
	Divider,
	FormGroup,
} from "@blueprintjs/core";
import { ITag, ITagForm } from "types";
import React, { useEffect } from "react";
import Query from "./Query";
import { TagSelector } from "./TagSelect";

import QueryBuilderClasses from "../styles/QueryBuilder.module.css";
import QueryTag from "./QueryTag";
import { useRouter } from "next/router";
import useTags from "@hooks/tags/useTags";
import { useUser } from "@hooks/user";

interface QueryBuilderProps {
	queries: ReadableQueryOperator[];
	onChangeQuery: (query: ReadableQueryOperator[]) => void;
	maxTags?: number;
	maxQueries?: number;
	noContent?: React.ReactNode;
	tags: ITagForm[];
	onChangeTags: (tags: ITagForm[]) => void;
}

const DEFAULT_QUERY: ReadableQueryOperator = {
	header: "title",
	operator: "es igual que",
	value: "",
};

const QueryBuilder = ({
	queries = [],
	onChangeQuery,
	tags,
	onChangeTags,
	maxQueries,
	maxTags,
	noContent,
}: QueryBuilderProps) => {
	const router = useRouter();
	const user = useUser();

	const headers = [
		"_id",
		"title",
		"folio",
		"expediente",
		"createdAt",
		"createdBy",
	];

	// fetch tags from area
	const { data, isLoading, isError, error } = useTags(
		user!._id ? user!._id : ""
	);

	const [menuTags, setMenuTags] = React.useState<ITagForm[]>([]);

	// transform tags to ITagForm
	useEffect(() => {
		if (data) {
			console.log(data);
			setMenuTags(data.tags);
		}
	}, [data]);

	const handleRemoveQuery = (index: number) => {
		const newQueries = [...queries];
		newQueries.splice(index, 1);
		onChangeQuery(newQueries);
	};

	const handleAddQuery = (query: ReadableQueryOperator) => {
		if (maxQueries && queries.length >= maxQueries) {
			return;
		}

		// validate query
		if (query.header === "" || query.value === "") {
			return;
		}

		const newQueries = [...queries, query];
		onChangeQuery(newQueries);

		setQueryInput({ ...query, value: "" });
	};

	const renderNoContent = () => {
		if (noContent) {
			return noContent;
		}
		return (
			<div className={QueryBuilderClasses.noContent}>
				<p>Ninguna consulta agregada</p>
			</div>
		);
	};

	const [queryInput, setQueryInput] = React.useState<ReadableQueryOperator>(DEFAULT_QUERY);

	return (
		<div className={QueryBuilderClasses.builder}>
			<FormGroup
				label="A??adir consulta"
				subLabel="A??adir una consulta para filtrar los resultados"
			>
				<ControlGroup className={QueryBuilderClasses.queryGroup}>
					<Query
						headers={headers}
						query={queryInput}
						onChangeQuery={setQueryInput}
						onEnter={handleAddQuery}
					/>
					<Button icon="add" onClick={() => handleAddQuery(queryInput)} text={"Agregar Filtro"} />
				</ControlGroup>
			</FormGroup>
			<FormGroup
				label="Etiquetas"
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
			<div className={QueryBuilderClasses.queryTags}>
				<FormGroup
					label="Consultas Actuales"
				>
					{queries.length > 0
						? <>
							{queries.map((q, i) => (
								<ControlGroup key={i}>
									<QueryTag
										query={q}
										onRemoveQuery={() => handleRemoveQuery(i)}
									/>
								</ControlGroup>
							))}
						</>
						: renderNoContent()}
				</FormGroup>
			</div>
		
			{/* <FormGroup
                label="Consultas"
                subLabel="Las consultas que se usar??n para filtrar los resultados"
            >
               
            </FormGroup> */}
		</div>
	);
};

export default QueryBuilder;
