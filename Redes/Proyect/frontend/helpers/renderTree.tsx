import OurTreeNode from "../components/OurTreeNode";

interface Node {
	_id: string;
	name: string;
	insideFolders: Node[];
	insideDocuments: [];
	path: String;
	tags: [];
	createdBy: {};
}

const renderTree = ({ nodes }: { nodes: Node[] }) => {
	if (!nodes) {
		return;
	}
	return nodes.map((node: Node) => {
		return (
			<OurTreeNode {...node}>
				{renderTree({ nodes: node.insideFolders })}
			</OurTreeNode>
		);
	});
};

export default renderTree;
