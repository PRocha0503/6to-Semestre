
type DocumentQueryKeys = 
    | "document"
    | "documents"

interface IDocument {
    tags: ITag[]
}

interface ITag {
    name: string;
}