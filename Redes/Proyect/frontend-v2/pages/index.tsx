import { Button, NonIdealState } from "@blueprintjs/core";
import React, { useCallback, useEffect } from "react";
import useQueryDocuments, {
	QueryDocumentRequest,
} from "@hooks/document/useQueryDocuments";
import Head from "next/head";
import type { IDocument } from "types";
import { LogsWindow } from "@components/LogsWindow";
import type { NextPage } from "next";
import QueryBuilder from "@components/QueryBuilder";
import { Table } from "@components/Table";
import UploadModal from "@components/upload/UploadModal";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";


const operators = [
	"eq",
	"gt",
	"gte",
	"in",
	"lt",
	"lte",
	"ne",
	"nin",
	"regex",
	"exists",
	// add time operators
];

const validateOperator = (operator: string): Operator => {
	if (!operators.includes(operator)) {
		throw new Error("Invalid operator");
	}

	return operator as Operator;
};

const parseQueries = (query: string): Query[] => {
	let queries: Query[] = [];

	try {
		queries = query.split(" AND ").map((q) => {
			const [header, operator, value] = q.split(":");
			validateOperator(operator);
			return { header, operator, value } as Query;
		});

		return queries;
	} catch (e) {
		console.log(e);
		return [];
	}
};

const Home: NextPage = () => {
	// const [isOpen, setIsOpen] = React.useState;
	const onClose = () => {};
	const [ isOpen, setIsOpen ] = React.useState<boolean>(false);
	const router = useRouter();
	const [ logDocument , setLogDocument ] = React.useState<Partial<IDocument>>({
		title: "hello",
	});

	const [queryRequest, setQueryRequest] = React.useState<QueryDocumentRequest>({
		queries: [],
		tags: [],
	});

	const { data, isLoading, isError, error } = useQueryDocuments(queryRequest);

	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);

	// javascript creates a ne function every frame so we need to memoize it
	const handleUpdateURL = useCallback(async () => {
		console.log(queryRequest);
		const query = queryRequest.queries
			.map((q) => encodeURIComponent(`${q.header}:${q.operator}:${q.value}`))
			.join(" AND ");
		await router.push({
			query: { query },
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryRequest.queries]);

	// update url when query changes
	useEffect(() => {
		handleUpdateURL();
	}, [handleUpdateURL]);

	// update url first load
	useEffect(() => {
		const sParams = new URLSearchParams(window.location.search);
		const query = decodeURIComponent(sParams.get("query") || "");

		setQueryRequest({
			queries: parseQueries(query),
			tags: [],
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getTableData = () => {
		if (isError) {
			return <NonIdealState title="Error" description={error.message} />;
		}

		if (!data || data?.documents?.length === 0) {
			return <NonIdealState title="No documents found" />;
		}

		return <Table onLogOpen={(it) => {
			setLogDocument(it)
			setIsOpen(true)
		}} documents={data.documents} loading={isLoading} />;
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<QueryBuilder
				queries={queryRequest.queries}
				onChangeQuery={(queries) =>
					setQueryRequest({ ...queryRequest, queries })
				}
				tags={queryRequest.tags}
				onChangeTags={(tags) => setQueryRequest({ ...queryRequest, })}
				maxTags={5}
				maxQueries={5}
				
			/>
			{getTableData()}
			<UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
			<LogsWindow document={logDocument} onClose={() => setIsOpen(false)} isOpen={isOpen} />
		</div>
	);
};

export default Home;
