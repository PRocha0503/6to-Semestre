interface User {
	username: string;
}

interface Log {
	method: any;
	endpoint: any;
	_id: string;
	date: Date;
	user: User;
}
declare interface Document {
	_id: string;
	title: string;
	path: string;
	tags: [];
	createdBy: {};
	logs: Log[];
}

declare interface Folder {
	_id: string;
	name: string;
	insideFolders: Node[];
	insideDocuments: Document[];
	path: String;
	tags: [];
	createdBy: {};
	logs: Log[];
}
