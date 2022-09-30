import { IUser } from "types/user";
import client from "@services/http";
import { useQuery } from "react-query";

const fetchUsers = async (): Promise<IUser> => {
	return (await client.get(`/user`)).data;
};

export default function useGetUsers() {
	return useQuery<any, Error>("query-users", () => fetchUsers());
}
