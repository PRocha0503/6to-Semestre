import { useState } from "react";
import Papa from "papaparse";

import Table from "../components/table.jsx";
import "../styles/main.css";
import praseTable from "../utils/praseTable";

const Main = () => {
	// State to store parsed data
	const [parsedData, setParsedData] = useState([]);

	//State to store table Column name
	const [tableRows, setTableRows] = useState([]);

	//State to store the values
	const [values, setValues] = useState([]);

	//State to store the values
	const [pValues, setPValues] = useState([]);
	const changeHandler = (event) => {
		// Passing file data (event.target.files[0]) to parse using Papa.parse
		Papa.parse(event.target.files[0], {
			header: true,
			skipEmptyLines: true,
			complete: function (results) {
				const rowsArray = [];
				const valuesArray = [];
				const praseValues = [];

				// Iterating data to get column name and their values
				results.data.map((row) => {
					praseValues.push(praseTable(Object.values(row)));
					rowsArray.push(Object.keys(row));
					valuesArray.push(Object.values(row));
				});

				// Parsed Data Response in array format
				setParsedData(results.data);

				// Filtered Column Names
				setTableRows(rowsArray[0]);

				// Filtered Values
				setValues(valuesArray);
				setPValues(praseValues);
			},
		});
	};
	return (
		<div className="root">
			<h1>Please select a file to import</h1>
			<input type="file" name="file" accept=".csv" onChange={changeHandler} />
			<div className="tables">
				<Table tableRows={tableRows} values={values} />
				<Table tableRows={tableRows} values={pValues} />
			</div>
		</div>
	);
};

export default Main;
