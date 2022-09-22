import client from "@services/http";
import { useQuery } from "react-query";

interface QueryDocumentRequest {
    queries: Query[];
    tags: ITag[];
}

const queryDocuments = async ({ queries, tags} : QueryDocumentRequest): Promise<IDocument> => {
    return client.get(`/documents/`, { data: { queries, tags } });
};

export default function useQueryDocuments(req: QueryDocumentRequest) {
    return useQuery<IDocument, Error>(
        "query-documents", () => queryDocuments(req),
        { retry: 2 }
    )
}