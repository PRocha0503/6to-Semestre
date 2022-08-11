import "../styles/square.css";

const Square = ({ tile = "", index, set }) => {
	return (
		<div className="square" onClick={() => set(index)}>
			<h1 className={tile == "X" ? "red" : "blue"}>{tile}</h1>
		</div>
	);
};

export default Square;
