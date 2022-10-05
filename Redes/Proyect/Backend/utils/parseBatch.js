const XLSX = require("xlsx");

const validHeaders = [
    "title",
    "folio",
    "expediente",
]

const validMongoKey = /^[a-zA-Z0-9_]+$/;

const isHeaderValid = (header) => {
    // validate with regex that header is valid mongo key
    return validMongoKey.test(header);

}

const validateValue = (value) => {
    // validate that value is valid for header
   return value !== undefined && value !== null && value !== "";
}

/**
 * Will an array of documents to be inserted into the database from an excel file
 * @param {*} sheet 
 * @param {*} batchId 
 * @param {*} extraParams 
 * @returns 
 */
const parseBatch = (sheet = [], batchId, extraParams) => {
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const rows = [];

    // get headers from first row
    if (json.length < 0) {
        throw new Error("No data found");
    }

    const headers = json[0];
    const mapHeaderToIndex = {}

    // validate headers
    for (let i = 0; i < validHeaders.length; i++) {
        if (!headers.includes(validHeaders[i])) {
            throw new Error(`Missing ${headers[i]} header`);
        }

        mapHeaderToIndex[headers[i]] = i;
    }

    // map headers to index
    for (let i = 0; i < headers.length; i++) {
        if (!isHeaderValid(headers[i])) {
            throw new Error(`Invalid header ${headers[i]}`);
        }
    }

    // get rows without headers
    const dataSlice = json.slice(1);

    // remove empty rows
    const fileredData = dataSlice.filter((row) => row.length > 0)

    for (let i = 0; i < fileredData.length; i++) {
        const row = fileredData[i];
        const resultRow = { batchId, ...extraParams, metadata: {} };
        
        for (let j = 0; j < row.length; j++) {
            const header = headers[j];
            const value = row[j];

            // check if header is known
            if (mapHeaderToIndex[header] === j) {
                if (!validateValue(value)) {
                    throw new Error(`Invalid value for header ${header}`);
                }

                resultRow[header] = value;
                continue;
            }

            resultRow.metadata[header] = value;
        }

        rows.push(resultRow);
    }

    // filter out empty rows
    return rows
}

module.exports = {
    parseBatch
};