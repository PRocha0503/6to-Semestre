import { useEffect, useState } from "react";

import "../styles/gato.css";

import Square from "../components/Square";

const Gato = () => {
	const [player, setPlayer] = useState(1);
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

	useEffect(() => {
		isGameOver();
	}, [player]);
	const isGameOver = () => {
		if (
			board.every((tile) => {
				return tile !== "";
			})
		) {
			alert("Game Over, its a tie");
			setBoard(["", "", "", "", "", "", "", "", ""]);
			return 0;
		}
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < winningCombinations.length; i++) {
			const [a, b, c] = winningCombinations[i];
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				alert(`Player ${player} Won`);
				setBoard(["", "", "", "", "", "", "", "", ""]);
			}
		}
		return false;
	};

	const setSymbol = (index) => {
		const symbol = player == 1 ? "X" : "O";
		const newBoard = [...board];
		newBoard[index] = symbol;
		setBoard(newBoard);
		setPlayer(player == 1 ? 2 : 1);
	};
	return (
		<>
			<div className="center">
				<h1>Tic Tac Toe</h1>
				<h2>Player = {player}</h2>
				<div className="board">
					{board.map((symbol, index) => {
						return <Square tile={symbol} index={index} set={setSymbol} />;
					})}
				</div>
			</div>
		</>
	);
};

export default Gato;
