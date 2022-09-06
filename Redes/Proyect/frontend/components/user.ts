import { createContext, useContext } from "react";

export interface User {
	username: string;
	permissions: any[];
}
export const UserContext = createContext<User | null>(null);

export const useUser = () => {
	return useContext(UserContext);
};
