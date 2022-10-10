// import { IDocument } from "types";
import { useMutation, useQueryClient } from "react-query";
import client from "@services/http";

export interface CreateDocumentRequest {
    title : string;
    folio : string;
    expediente : string;
    createdAt? : Date;
    area?: string;
    tags?: string[];
    metadata?: Record<string, string | number | boolean | Date>;
    onSuccess: () => void;
    onError: (error: Error) => void;
}

const addDocument = async (req: Omit<CreateDocumentRequest, "onSuccess" | "onError">): Promise<CreateDocumentRequest> => {
	return (await client.post(`/docs`,req)).data;
};

export default function useCreateDocument({ onSuccess, onError, ...document }: CreateDocumentRequest) {
    const queryClient =  useQueryClient();
	return useMutation<CreateDocumentRequest, Error>(() => addDocument(document), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["query-documents"]);
            onSuccess()
        },
        onError

    });
}
