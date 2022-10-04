export enum ILogType {
    User = "User",
    Document = "Document",
    Area = "Area",
    Tag = "Tag",
    Permission = "Permission",
    Folder = "Folder",
    Other = "Other"
}

export interface ILog {
    type: ILogType,
    method: Method,
    endpoint: string,
    user: IUser,
    date: string,
}

export interface IUser{
    username:string,
}