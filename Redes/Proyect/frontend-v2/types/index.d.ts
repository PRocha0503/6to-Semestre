import type { IconName } from "@blueprintjs/icons";

export declare type DocumentQueryKeys = "document" | "documents";

interface IDocument {
	tags: ITag[];
	_id: string;
	title: string;
	folio: string;
	expediente: string;
	createdAt: Date;
	createdBy: any;
	area: any;
	logs: string[];
	metadata: any;
	hasFile: boolean;
}

export declare interface ITag {
	name: string;
}

export declare interface ITagForm {
	name: string;
	icon?: IconName;
	color: string;
	_id: string
}
