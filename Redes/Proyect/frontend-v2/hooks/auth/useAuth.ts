// import { IDocument } from "types";
import client from "@services/http";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

interface AuthRequest {
	username: string;
	password: string;
}

interface AuthResponse {
	accessToken: string;
	refreshToken: string;
}

const login = async ({
	username,
	password,
}: AuthRequest): Promise<AuthResponse> => {
	return (await client.post(`/auth/login`, { username, password })).data;
};

export default function useLogin(req: AuthRequest) {
	return useMutation<AuthResponse, AxiosError>(() => login(req));
}
