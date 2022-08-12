import { useState } from "react";
import { ChromePicker } from "react-color";

import "../styles/clock.css";

const Clock = ({ date }) => {
	const [color, setColor] = useState("#ff0000");
	const changeColor = ({ hex }) => {
		setColor(hex);
	};
	return (
		<div className="clock">
			<ChromePicker color={color} onChangeComplete={changeColor} />
			<h1 style={{ color }}>{date}</h1>
		</div>
	);
};

export default Clock;
