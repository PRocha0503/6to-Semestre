import { Button, NonIdealState } from '@blueprintjs/core'
import React, { useCallback, useEffect } from 'react'
import useQueryDocuments, { QueryDocumentRequest } from '@hooks/document/useQueryDocuments'
import Head from 'next/head'
import type { IDocument } from 'types'
import type { NextPage } from 'next'
import QueryBuilder from '@components/QueryBuilder'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import {Table} from "@components/Table"

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
]

const validateOperator = (operator: string): Operator => {
    if (!operators.includes(operator)) {
        throw new Error("Invalid operator");
    }

    return operator as Operator;
}

const parseQueries = (query: string): Query[] => {
    let queries: Query[] = [];

    try{
      queries = query.split(" AND ").map((q) => {
          const [header, operator, value] = q.split(":");
          validateOperator(operator);
          return { header, operator, value } as Query;
      });

    return queries;

  } catch (e) {
    console.log(e);
    return []
  }
}

const Home: NextPage = () => {
  const router = useRouter()
  
  const [queryRequest, setQueryRequest] = React.useState<QueryDocumentRequest>({
    queries: [],
    tags: [],
  })
      
  const { data, isLoading, isError, error } = useQueryDocuments(queryRequest)

  // javascript creates a ne function every frame so we need to memoize it
  const handleUpdateURL = useCallback(async () => {
    console.log(queryRequest)
    const query = queryRequest.queries.map((q) => encodeURIComponent(`${q.header}:${q.operator}:${q.value}`)).join(" AND ")
    await router.push({
      query: { query }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryRequest.queries])

    // update url when query changes
  useEffect(() => {
      handleUpdateURL()
    }, [handleUpdateURL])

  // update url first load
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => decodeURIComponent(searchParams.get(prop as string) || ""),
    }); 

    setQueryRequest({
      queries: parseQueries(params["query"]),
      tags: [],
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRows = (doc: IDocument) => {
    const rows = []
    for (const [key, value] of Object.entries(doc)) {
      rows.push(
        <td key={key}>
          <tr>{key}</tr>
          <tr>{value}</tr>
        </td>
      )
    }
    return <tr>
          {rows}
          </tr>
  }
const getTableData = () => {
    if (isLoading) {
      return <NonIdealState title="Loading..." />
    }

    if (isError) {
      return <NonIdealState title="Error" description={error.message} />
    }

    if (!data || data?.documents?.length === 0) {
      return <NonIdealState title="No documents found" />
    }

    return (
      <Table documents={data.documents}></Table>
    )

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryBuilder
        queries={queryRequest.queries} 
        onChangeQuery={(queries) => setQueryRequest({ ...queryRequest, queries }) }
        tags={queryRequest.tags}
        onChangeTags={(tags) => setQueryRequest({ ...queryRequest, tags })}  
        maxTags={5}
        maxQueries={5}/>
      {getTableData()}
    </div>
  )
}

export default Home;
