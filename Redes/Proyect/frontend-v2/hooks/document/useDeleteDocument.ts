import { IUser } from "../../types/user";
// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";

interface AuthRequest {
	documentId: string;
}

const deleteDocument = async ({ documentId }: AuthRequest): Promise<IUser> => {
	return (await client.delete(`/docs/${documentId}`)).data;
};

export default function useDeleteDocument(req: AuthRequest) {
	const queryClient = useQueryClient();
	return useMutation<IUser, Error>(() => deleteDocument(req), {
		// onSuccess: () => {
		// 	queryClient.invalidateQueries(["query-users"]);
		// },
	});
}
