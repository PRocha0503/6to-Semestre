// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";

interface AuthRequest {
	username: string;
	password: string;
}

interface AddUserResponse {
	user: {
		username: string;
		areas: any[];
		isAdmin: boolean;
		_id: string;
	};
}

const addUser = async ({
	username,
	password,
}: AuthRequest): Promise<AddUserResponse> => {
	return (await client.post(`/user`, { username, password })).data;
};

export default function useAddUser(req: AuthRequest) {
	const queryClient = useQueryClient();
	return useMutation<AddUserResponse, Error>(() => addUser(req), {
		onSuccess: () => {
			queryClient.invalidateQueries(["query-users"]);
		},
	});
}
