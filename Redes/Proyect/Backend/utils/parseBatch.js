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
    const json = XLSX.utils.sheet_to_json(sheet);   

    const rows = [];

    // get headers from first row
    if (json.length < 0) {
        throw new Error("No data found");
    }

    const headers = Object.keys(json[0]);
    const mapHeaderToIndex = {}

    // validate headers
    for (let i = 0; i < validHeaders.length; i++) {
        if (!headers.includes(validHeaders[i])) {
            throw new Error(`Missing ${validHeaders[i]} header`);
        }

        mapHeaderToIndex[validHeaders[i]] = i;
    }

    // map headers to index
    for (let i = 0; i < headers.length; i++) {
        if (!isHeaderValid(headers[i])) {
            throw new Error(`Invalid header ${headers[i]}`);
        }
    }

    // remove empty rows
    const fileredData = json.slice(0).filter((row) => Object.values(row).join("") !== "");

    for (let i = 0; i < fileredData.length; i++) {
        const row = fileredData[i];
        const knownFields = {};
        const unknownFields = {};

        for (let j = 0; j < validHeaders.length; j++) {
            knownFields[validHeaders[j]] = row[validHeaders[j]];
        }

        for (let j = 0; j < headers.length; j++) {
            if (!validHeaders.includes(headers[j])) {
                unknownFields[headers[j]] = row[headers[j]];
            }
        }

        const resultRow = { batchId, ...extraParams, ...knownFields , metadata: {
            ...unknownFields
            }
        }
        
        rows.push(resultRow);
    }

    // filter out empty rows
    return rows
}

module.exports = {
    parseBatch
};