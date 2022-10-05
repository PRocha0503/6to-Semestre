import { IArea } from "types/area";
export interface IUser {
	username: string;
	areas: IArea[];
	isAdmin: boolean;
	_id?: string;
}
