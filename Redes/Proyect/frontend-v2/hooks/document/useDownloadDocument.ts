import { IDocument } from "types";
import client from "@services/http";
import { useQuery } from "react-query";

//TODO make correct

const downloadDocument = async (id: string): Promise<IDocument> => {
	return client.get(`/docs/${id}`);
};

export default function useDocument(id: string) {
	return useQuery<IDocument, Error>("query-document-by-id", () =>
		downloadDocument(id)
	);
}
