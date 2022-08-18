import "../styles/table.css";

const Table = ({ title, tableRows = [], values = [] }) => {
	return (
		<>
			{values.length > 0 ? (
				<div className="centerTitle">
					<h2>{title}</h2>
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
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Table;
