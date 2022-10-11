import { IDocument } from "types";
import client from "@services/http";
import { useQuery } from "react-query";

//TODO make correct

const downloadDocument = async (id: string): Promise<any> => {
	return client.get(`/docs/download/${id}`);
};

export default function useDownloadDocument(id: string) {
	return useQuery<any, Error>(["get-download-document", id], () =>
		downloadDocument(id)
	);
}
