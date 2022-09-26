
type DocumentQueryKeys = 
    | "document"
    | "documents"

interface IDocument {
    tags: ITag[],
    _id: number,
    title: string,
    folio: string,
    expediente: string,
    createdAt: Date,
    createdBy:string,
    area: string, 
}

interface ITag {
    name: string;
}