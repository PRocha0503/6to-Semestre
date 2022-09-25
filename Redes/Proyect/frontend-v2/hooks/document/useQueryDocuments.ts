import { IDocument, ITag } from "types";
import client from "@services/http";
import { useQuery } from "react-query";

export interface QueryDocumentRequest {
    queries: Query[];
    tags: ITag[];
}

const queryDocuments = async ({ queries, tags} : QueryDocumentRequest): Promise<IDocument[]> => {
    return client.get(`/documents/`, { data: { queries, tags } });
};

export default function useQueryDocuments(req: QueryDocumentRequest, options = {}) {
    return useQuery<IDocument[], Error>(
        "query-documents", () => queryDocuments(req),
        {
            ...options,
            retry: false,
        }
    )
}