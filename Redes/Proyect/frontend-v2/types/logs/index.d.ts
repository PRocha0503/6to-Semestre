export declare enum ILogType {
	User = "User",
	Document = "Document",
	Area = "Area",
	Tag = "Tag",
	Permission = "Permission",
	Folder = "Folder",
	Other = "Other",
}

export declare interface ILog {
    type: ILogType,
    method: Method,
    endpoint: string,
    user: IUser,
    date: string,
    message: string,
}

export declare interface IUser{
    username:string,
}
