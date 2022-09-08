import OurTreeNode from "../components/OurTreeNode";
import DocumentSide from "../components/DocumentSide";

interface Document {
	_id: string;
	title: string;
	path: String;
	tags: [];
	createdBy: {};
}

const renderDocument = ({ documents }: { documents: Document[] }) => {
	if (!documents) {
		return;
	}
	return documents.map((doc: Document) => {
		return <DocumentSide {...doc}></DocumentSide>;
	});
};

export default renderDocument;
