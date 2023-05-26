const fs = require('fs');
const csv = require('csv-parse');

const db = require('./db');

const VALID_DATE_PATTERN = /\d{4}-\d{2}-\d{2}/;

async function parseAndStoreData(csvFilePath) {
    const parser = fs
        .createReadStream(csvFilePath)
        .pipe(csv.parse({}));
    let recordCount = 0
    let line = 0
    for await (const record of parser) {
        line++;
        // skip header?
        if (line === 1) {
            continue;
        }
        try {
            const price = parseFloat(record[2]);
            if (isNaN(price)) {
                throw new Error("invalid price");
            }
            const date = validateDate(record[3]);
            if (!date) {
                throw new Error("invalid date");
            }
            const doc = {
                commodity: record[0],
                market: record[1],
                price,
                date
            }
            await db.addData(doc)
            recordCount++;
        }
        catch (err) {
            console.error(`encountered parse and store error at line ${line}:`, err);
        }
    }
    return recordCount
}

function validateDate(s) {
    // This behaves like parseFloat, where we fetch
    // the first valid date, rather than ensure that
    // entire string is valid date.
    const m = VALID_DATE_PATTERN.exec(s);
    if (m) {
        return Date.parse(m[0])
    }
}

module.exports = {
    parseAndStoreData
};