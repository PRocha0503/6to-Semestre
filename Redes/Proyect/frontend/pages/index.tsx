import type { NextPage } from "next";
import styles from "../styles/Home.module.css";


import FolderExplorer from "../components/FolderExplorer";
import { useState } from "react";
import { useUser } from "../hooks/user";
import SelectedItem from "../components/SelectedItem";

const Home: NextPage = () => {
	const user = useUser();

	const [selectedNode, setSelectedNode] = useState<any>(null);

	return (
		<div className={styles.container}>
			<div className={styles.contentLayout}>
				<FolderExplorer onSelect={(node) => setSelectedNode(node)} />
				{selectedNode && <SelectedItem f={selectedNode} />}
			</div>
		</div>
	);
};

export default Home;
