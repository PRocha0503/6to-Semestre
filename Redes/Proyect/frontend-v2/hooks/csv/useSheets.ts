import * as XLSX from "xlsx";
import { useCallback, useEffect, useState } from "react";

type CellType = "n" | "s" | "b" | "d" | "e";

type GetVType<T extends CellType> = T extends "n" ? number : T extends "s" ? string : T extends "b" ? boolean : T extends "d" ? Date : T extends "e" ? Error : never; 

export interface SheetCell {
    t: CellType;
    v: GetVType<CellType>;
}

export interface Sheet {
    name: string;
    headers: string[];
    data: SheetCell[][] | null;
}

interface Response {
    sheets: Sheet[];
    isLoading: boolean;
    error: string | null;
}

const useSheets = (file: File | null, header?: boolean): Response => {
    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [ error, setError ] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getHeaders = useCallback((sheet: XLSX.WorkSheet): string[] => {
        if (!header) {
            return [];
        }

        const headers: string[] = [];
        const range = XLSX.utils.decode_range(sheet["!ref"] || "");

        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell = sheet[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
            headers.push(cell?.v || "");
        }

        return headers;
    }, [header]);

    const getSheetData = useCallback((sheet: XLSX.WorkSheet) => {
        const range = XLSX.utils.decode_range(sheet["!ref"] || "");
        const data: SheetCell[][] = [];
    
        for (let R = range.s.r + (header ? 1 : 0) ; R <= range.e.r; ++R) {
            const row: SheetCell[] = [];
            for (let C = range.s.c; C <= range.e.c; ++C) {
                let pCell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];

                if (pCell) {
                    row.push({
                        t: pCell.t,
                        v: pCell.v,
                    });
                }

            }

            // Skip empty rows
            if (row.length > 0) {
                data.push(row);
            }

        }
        return data;
    }, [header]);
    
    useEffect(() => {
        if (file) {
            setLoading(true);
            const reader = new FileReader();

            // Handle errors
            reader.onerror = (e) => {
                setError("Error reading file");
                setLoading(false);
            };

            // Loaded successfully
            reader.onloadend = (e) => {
                setLoading(false);
            }

            reader.onload = (e: ProgressEvent<FileReader>) => {
                let result = e.target?.result;
                console.log({result});
                if (result) {
                    const workbook = XLSX.read(result, { type: "binary" });

                    const sheets = workbook.SheetNames.map((sheetName) => {
                        const sheet = workbook.Sheets[sheetName];
                        // const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
                        const headers = getHeaders(sheet);
                        const data = getSheetData(sheet);
                    
                        return { name: sheetName, data, headers };
                    });
                    setSheets(sheets);
                    console.log({sheets});
                }
            }

            // Read the file
            reader.readAsBinaryString(file);
        }
    }, [file, getHeaders, getSheetData, header]);
    

    return { sheets, isLoading: loading, error }
}

export default useSheets;