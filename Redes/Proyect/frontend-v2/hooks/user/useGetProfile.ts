import { IUser } from "types/user";
import client from "@services/http";
import { useQuery } from "react-query";

interface ProfileAreas {
	_id: string;
	name: string;
	tags: ITags[];
}
interface ProfileUser {
	_id: string;
	username: string;
	areas: ProfileAreas[];
}

const fetchProfile = async (): Promise<ProfileUser> => {
	return (await client.get(`/user/myProfile`)).data.user;
};

export default function useGetProfile() {
	return useQuery<ProfileUser, Error>("query-profile", () => fetchProfile());
}
