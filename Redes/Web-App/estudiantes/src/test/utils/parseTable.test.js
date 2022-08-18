import {
	praseName,
	praseID,
	praseDate,
	praseGrade,
	praseTable,
} from "../../utils/praseTable";

describe("Test individual functions", () => {
	test("Parse Name", () => {
		expect(praseName("PABLO ROCHA OJEDA")).toBe("PABLO ROCHA");
	});

	test("Parse ID", () => {
		expect(praseID("A01028638")).toBe("A01028638@tec.mx");
	});
	test("Parse Date", () => {
		expect(praseDate("01/02/2020")).toBe("02/01/2020");
	});
	test("Parse Grade", () => {
		expect(praseGrade("100")).toBe("A");
	});
});

describe("Test row", () => {
	test("Full row", () => {
		expect(
			praseTable([1, "PABLO ROCHA OJEDA", "A01028638", "01/02/2020", "100"])
		).toStrictEqual([1, "PABLO ROCHA", "A01028638@tec.mx", "02/01/2020", "A"]);
	});
});
