import { Button, Card, NonIdealState } from "@blueprintjs/core";
import React, { useCallback, useEffect } from "react";
import useQueryDocuments, {
	QueryDocumentRequest,
} from "@hooks/document/useQueryDocuments";
import DocWindow from "@components/DocWindow";
import Head from "next/head";
import type { IDocument, ITagForm } from "types";
import { LogsWindow } from "@components/LogsWindow";
import type { NextPage } from "next";
import QueryBuilder from "@components/QueryBuilder";
import { Table } from "@components/Table";
import UploadModal from "@components/upload/UploadModal";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import AddDocumentModal from "@components/AddDocumentModal";

const operators = [
	"es igual que",
	"no es igual que",
	"es mayor que",
	"es menor que",
	"es mayor o igual que",
	"es menor o igual que",
	"contiene",
	"no contiene",
	"empieza con",
	"termina con",
	"existe",
	"no existe",
];

const validateOperator = (operator: string): ReadableOperator => {
	if (!operators.includes(operator)) {
		throw new Error("Invalid operator");
	}

	return operator as ReadableOperator;
};

const parseQueries = (query: string): ReadableQueryOperator[] => {
	let queries: ReadableQueryOperator[] = [];

	try {
		queries = query.split(" AND ").map((q) => {
			const [header, operator, value] = q.split(":");
			validateOperator(operator);

			return { header, operator, value } as ReadableQueryOperator;
		});

		return queries;
	} catch (e) {
		console.log(e);
		return [];
	}
};

const parseTags = (query: string): ITagForm[] => {
	let tags: ITagForm[] = [];
	try {
		tags = query.split(" OR ").map((q) => {
		if (q.split(":").length !== 4) {
			throw new Error("Invalid tag");
		}

		const [icon, name, color, id] = q.split(":");
		
		return { icon, name, color, _id: id } as ITagForm;
	});

	return tags;

	} catch (e) {
		console.log(e);
		return [];
	}
}

const Home: NextPage = () => {
	// const [isOpen, setIsOpen] = React.useState;
	const onClose = () => {};
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [isOpen2, setIsOpen2] = React.useState<boolean>(false);
	const router = useRouter();
	const [logDocument, setLogDocument] = React.useState<Partial<IDocument>>({
		title: "hello",
	});
	const [details, setDetails] = React.useState<IDocument>({
		title: "hello",
		tags: [],
		_id: "1",
		createdAt: new Date(),
		folio: "123",
		expediente: "123",
		createdBy: "123",
		area: "123",
		logs: [],
		metadata: {},
		hasFile: false,
	});

	const [queryRequest, setQueryRequest] = React.useState<QueryDocumentRequest>({
		queries: [],
		tags: [],
	});

	const { data, isLoading, isError, error } = useQueryDocuments(queryRequest);

	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
	const [isOpenDocumentModal, setIsOpenDocumentModal] = React.useState<boolean>(false);

	// javascript creates a ne function every frame so we need to memoize it
	const handleUpdateURL = useCallback(async () => {
		console.log(queryRequest);
		const query = queryRequest.queries
			.map((q) => encodeURIComponent(`${q.header}:${q.operator}:${q.value}`))
			.join(" AND ");

		const tags = queryRequest.tags.map((t) => encodeURIComponent(`${t.icon}:${t.name}:${t.color}:${t._id}`)).join(" OR ") ;
		await router.push({
			query: { query, tags },
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryRequest.queries, queryRequest.tags]);

	// update url when query changes
	useEffect(() => {
		handleUpdateURL();
	}, [handleUpdateURL]);

	// update url first load
	useEffect(() => {
		const sParams = new URLSearchParams(window.location.search);
		const query = decodeURIComponent(sParams.get("query") || "");
		const tags = decodeURIComponent(sParams.get("tags") || "");

		setQueryRequest({
			queries: parseQueries(query),
			tags: parseTags(tags),
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

		return (
			<Table
				onLogOpen={(it) => {
					console.log(it);
					setLogDocument(it);
					setIsOpen(true);
				}}
				documents={data.documents}
				loading={isLoading}
				onDetOpen={(it) => {
					setDetails(it);
					setIsOpen2(true);
				}}
			/>
		);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>AAO</title>
				<meta name="description" content="Alcaldia Alvaro Obregon" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h2
				style={{
					// nice blue color
					color: "#106ba3",
				}}
			>
				Busqueda de registros
			</h2>
			<QueryBuilder
				queries={queryRequest.queries}
				onChangeQuery={(queries) =>
					setQueryRequest({ ...queryRequest, queries })
				}
				tags={queryRequest.tags}
				onChangeTags={(tags) => setQueryRequest({ ...queryRequest, tags })}
				maxTags={5}
				maxQueries={5}
			/>
			<div
				className={styles.buttonContainer}
				style={{
					display: "flex",
					justifyContent: "flex-end",
					marginBottom: "2rem",
					height: "2rem",
				}}
			>

				<h4>
					Registros
				</h4>
				{/* temporary while we decide how to organize the view */}
				<Button
					onClick={() => setIsModalOpen(true)}
					icon={"panel-table"}
					className="exel"
				>
					Subir Excel
				</Button>
				<Button
					text={"Agregar Registro"}
					icon={"add"}
					className="new"
					onClick={() => setIsOpenDocumentModal(true)}
				/>
			</div>
			{getTableData()}
			<UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			<AddDocumentModal isOpen={isOpenDocumentModal} onClose={() => setIsOpenDocumentModal(false)} />
			<LogsWindow
				document={logDocument}
				onClose={() => setIsOpen(false)}
				isOpen={isOpen}
			/>
			<DocWindow
				document={details}
				onClose={() => setIsOpen2(false)}
				isOpen={isOpen2}
			/>
		</div>
	);
};

export default Home;
