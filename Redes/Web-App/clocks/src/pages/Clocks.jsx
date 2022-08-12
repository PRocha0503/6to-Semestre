import { useEffect, useState } from "react";

import Clock from "../components/Clock";
import "../styles/clocks.css";

const Clocks = () => {
	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	const [c, setC] = useState(1);
	const [date, setDate] = useState(new Date());

	return (
		<div className="root">
			<h1>CLOCKS</h1>
			<div className="counter">
				<button className="btn" onClick={() => setC(c - 1)}>
					-
				</button>
				<h1>{c.length}</h1>
				<button className="btn" onClick={() => setC(c + 1)}>
					+
				</button>
			</div>
			{[...Array(c)].map(() => (
				<Clock date={date.toLocaleTimeString()} />
			))}
		</div>
	);
};
export default Clocks;
