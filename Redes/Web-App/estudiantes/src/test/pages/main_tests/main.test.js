import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "../../../pages/Main.jsx";

afterEach(() => {
	cleanup();
});

describe("Test individual functions", () => {
	render(<Main />);
	test("Table", () => {
		expect(".").toBe(".");
	});
});
