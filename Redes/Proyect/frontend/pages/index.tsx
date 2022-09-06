import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import NavBar from "../components/NavBar";
import FolderExplorer from "../components/FolderExplorer";
import { useState, useEffect } from "react";
import { useUser } from "../components/user";
import { useRouter } from "next/router";

const Home: NextPage = () => {
	const user = useUser();

	const [selectedNode, setSelectedNode] = useState<any>(null);

	return (
		<div className={styles.container}>
			<NavBar />
			<div className={styles.contentLayout}>
				<FolderExplorer onSelect={(node) => setSelectedNode(node)} />
				<div>{selectedNode && <div>{selectedNode.label}</div>}</div>
			</div>
		</div>
	);
};

export default Home;
