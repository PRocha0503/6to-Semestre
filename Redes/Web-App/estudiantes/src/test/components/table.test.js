import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../../components/table.jsx";

afterEach(() => {
	cleanup();
});

describe("Test individual functions", () => {
	render(
		<Table
			title="TEST"
			tableRows={["a", "b"]}
			values={[
				[1, 2],
				[3, 4],
			]}
		/>
	);
	const table = screen.getByTestId("test-table");
	test("Table is built", () => {
		expect(table).toBeInTheDocument();
	});
	test("Table has text", () => {
		expect(table).toHaveTextContent("a");
		expect(table).toHaveTextContent("b");
		expect(table).toHaveTextContent("1");
		expect(table).toHaveTextContent("2");
	});
});
