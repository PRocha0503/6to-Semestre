import { IDocument, ITag, ITagForm } from "types";
import client from "@services/http";
import { useQuery } from "react-query";

export interface QueryDocumentRequest {
    queries: ReadableQueryOperator[];
    tags: ITagForm[];
}

interface QueryResponse {
    documents: IDocument[];
}

const operatorMap: Record<ReadableOperator, (s: string) => { operator: Operator, value: string }> = {
    "empieza con": (value: string) => {
        return {
            operator: "regex",
            value: `^${value}`
        };
    },
    "termina con": (value: string) => {
        return {
            operator: "regex",
            value: `${value}$`
        };
    },
    "contiene": (value: string) => {
        return {
            operator: "regex",
            value: `${value}`
        };
    },
    "es igual que": (value: string) => {
        return {
            operator: "eq",
            value: `${value}`
        };
    },
    "es mayor que": (value: string) => {
        return {
            operator: "gt",
            value: `${value}`
        };
    },
    "es mayor o igual que": (value: string) => {
        return {
            operator: "gte",
            value: `${value}`
        };
    },
    "es menor que": (value: string) => {
        return {
            operator: "lt",
            value: `${value}`
        };
    },
    "existe": (value: string) => {
        return {
            operator: "exists",
            value: `${value}`
        };
    },
    "es menor igual que": (value: string) => {
        return {
            operator: "lte",
            value: `${value}`
        };
    },
    "es distinto A": function (value: string): { operator: Operator; value: string; } {
        return {
            operator: "ne",
            value: `${value}`
        };
    }
}

const buildQuery = (queries: ReadableQueryOperator[]): string => {    
    const mappedQueries: QueryOperator[] = queries.map((query) => {
        const { operator, value } = operatorMap[query.operator](query.value);
        return { ...query, operator, value };
    });

    const query = mappedQueries.map((q, i) => {
        return `${q.header}:${q.operator}:${q.value}`
    }).join(" AND "); // TODO: make this configurable

    return query;
}
const queryDocuments = async ({ queries, tags} : QueryDocumentRequest): Promise<QueryResponse> => {
    return (await client.get(`/docs/query`, { params: { query: buildQuery(queries) } })).data;
};

export default function useQueryDocuments(req: QueryDocumentRequest, options = {}) {
    return useQuery<QueryResponse, Error>(
        ["query-documents", req], () => queryDocuments(req),
        {
            retry: false,
            staleTime: 10000, // only eligible to refetch after 10 seconds
            enabled: true,
            refetchOnWindowFocus: false,
            cacheTime: 10000
        }
    )
}