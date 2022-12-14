import { IUser } from "../../types/user";
// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";

interface AuthRequest {
	userId: string;
}

const deleteUser = async ({ userId }: AuthRequest): Promise<IUser> => {
	return (await client.delete(`/user/${userId}`)).data;
};

export default function useDeleteUser(req: AuthRequest) {
	const queryClient = useQueryClient();
	return useMutation<IUser, Error>(() => deleteUser(req), {
		onSuccess: () => {
			queryClient.invalidateQueries(["query-users"]);
		},
	});
}
