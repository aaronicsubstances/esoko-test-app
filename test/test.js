const { assert } = require("chai"); 

const db = require('../src/db');
const dataImporter = require('../src/dataImporter');

describe('test', () => {
    before(async function () {
        await db.client.db().dropDatabase();
    })

    it('should return average corresponding to empty database', async function() {
        const input = {
            commodity: undefined,
            market: undefined,
            start_date: undefined,
            end_date: undefined
        }
        const expected = {
            ...input,
            average_price: 0
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })

    it('should successfully add sample market data', async function() {
        const res = await dataImporter.parseAndStoreData(`${__dirname}/seedData.csv`);
        assert.equal(res, 5)
    })

    it('should return average corresponding to Kumasi and Maize', async function() {
        const input = {
            commodity: "Maize",
            market: "Kumasi Central Market",
            start_date: "2023-01-01",
            end_date: "2023-01-02"
        }
        const expected = {
            ...input,
            average_price: 155
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })

    it('should return average corresponding to Kumasi and Maize for first day only', async function() {
        const input = {
            commodity: "Maize",
            market: "Kumasi Central Market",
            start_date: "2023-01-01",
            end_date: "2023-01-01"
        }
        const expected = {
            ...input,
            average_price: 150
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })

    it('should return average corresponding to Tema and Rice', async function() {
        const input = {
            commodity: "Rice",
            market: "Tema Market",
            start_date: "2023-01-01",
            end_date: "2023-01-01"
        }
        const expected = {
            ...input,
            average_price: 200.50
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })

    it('should return average corresponding to Tema and Yam', async function() {
        const input = {
            commodity: "Yam",
            market: "Tema Market",
            start_date: "2023-01-01",
            end_date: "2023-01-02",
        }
        const expected = {
            ...input,
            average_price: 210.50
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })

    it('should return average corresponding to Koforidua', async function() {
        const input = {
            commodity: "Cocoa",
            market: "Koforidua Market",
            start_date: "2023-01-01",
            end_date: "2023-01-02"
        }
        const expected = {
            ...input,
            average_price: 350.25
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })

    it('should return average corresponding to impossible date range', async function() {
        const input = {
            commodity: "Cocoa",
            market: "Koforidua Market",
            start_date: "2023-01-02",
            end_date: "2023-01-01"
        };
        const expected = {
            ...input,
            average_price: 0
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })

    it('should return average corresponding to non-existent market or item', async function() {
        const input = {
            commodity: "Yam",
            market: "Koforidua Market",
            start_date: "2023-01-01",
            end_date: "2023-01-02"
        };
        const expected = {
            ...input,
            average_price: 0
        }
        const res = await db.computeAveragePrice(input)
        assert.deepEqual(res, expected)
    })
})
