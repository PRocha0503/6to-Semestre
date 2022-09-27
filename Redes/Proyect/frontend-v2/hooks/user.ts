import { createContext, useContext } from "react";
import { IUser } from "types/user";

export const UserContext = createContext<IUser | null>(null);

export const useUser = () => {
	return useContext(UserContext);
};
