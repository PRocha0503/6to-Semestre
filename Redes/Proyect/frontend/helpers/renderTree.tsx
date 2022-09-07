import OurTreeNode from "../components/OurTreeNode";

interface Node {
	id: number;
	label: string;
	ch?: Node[];
}

const renderTree = ({ nodes }: { nodes: Node[] }) => {
	console.log("N", nodes);
	if (!nodes) {
		return;
	}
	return nodes.map((node: Node) => {
		return (
			<OurTreeNode {...node}>{renderTree({ nodes: node.ch })}</OurTreeNode>
		);
	});
};

export default renderTree;
