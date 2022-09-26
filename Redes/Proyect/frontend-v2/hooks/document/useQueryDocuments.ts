import { IDocument, ITag } from "types";
import client from "@services/http";
import { useQuery } from "react-query";

export interface QueryDocumentRequest {
    queries: Query[];
    tags: ITag[];
}

interface QueryResponse {
    documents: IDocument[];
}


const buildQuery = (queries: Query[]): string => {    
    const query = queries.map((q, i) => {
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