import "../styles/table.css";

const Table = ({ tableRows = [], values = [] }) => {
	return (
		<>
			{/* Table */}
			<table className="table">
				<thead>
					<tr>
						{tableRows.map((rows, index) => {
							return <th key={index}>{rows}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{values.map((value, index) => {
						return (
							<tr key={index}>
								{value.map((val, i) => {
									return <td key={i}>{val}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Table;
