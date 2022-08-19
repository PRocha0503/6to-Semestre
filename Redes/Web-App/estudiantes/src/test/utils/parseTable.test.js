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
		expect(praseName("LUIS JAVIER KARAM")).toBe("LUIS JAVIER");
		expect(praseName("SALVADOR SALGADO NORMANDIA")).toBe("SALVADOR SALGADO");
	});

	test("Parse ID", () => {
		expect(praseID("A01028638")).toBe("A01028638@tec.mx");
		expect(praseID("A01422874")).toBe("A01422874@tec.mx");
		expect(praseID("A02857481")).toBe("A02857481@tec.mx");
	});
	test("Parse Date", () => {
		expect(praseDate("01/02/2020")).toBe("02/01/2020");
		expect(praseDate("10/12/2020")).toBe("12/10/2020");
		expect(praseDate("20/6/2021")).toBe("6/20/2021");
	});
	test("Parse Grade", () => {
		expect(praseGrade("100")).toBe("A");
		expect(praseGrade("92")).toBe("A-");
		expect(praseGrade("88")).toBe("B+");
		expect(praseGrade("84")).toBe("B");
		expect(praseGrade("80")).toBe("B-");
		expect(praseGrade("77")).toBe("C+");
		expect(praseGrade("73")).toBe("C");
		expect(praseGrade("70")).toBe("C-");
		expect(praseGrade("68")).toBe("D+");
		expect(praseGrade("64")).toBe("D");
		expect(praseGrade("63")).toBe("E");
	});
});

describe("Test row", () => {
	test("Full row", () => {
		expect(
			praseTable([1, "PABLO ROCHA OJEDA", "A01028638", "01/02/2020", "100"])
		).toEqual([1, "PABLO ROCHA", "A01028638@tec.mx", "02/01/2020", "A"]);
	});
	test("Error with wrong input", () => {
		expect(() => praseTable([1, "01/02/2020", "100"]).toThrow());
	});
});
