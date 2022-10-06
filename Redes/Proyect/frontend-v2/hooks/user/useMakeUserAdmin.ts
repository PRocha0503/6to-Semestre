import { IUser } from "../../types/user";
import client from "@services/http";
import { useMutation } from "react-query";

interface AuthRequest {
	userId: string;
}

const makeUserAdmin = async ({ userId }: AuthRequest): Promise<IUser> => {
	return (await client.put(`/user/makeAdmin/${userId}`)).data;
};

export default function useMakeUserAdmin(req: AuthRequest) {
	return useMutation<IUser, Error>(() => makeUserAdmin(req), {});
}
