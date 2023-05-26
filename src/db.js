const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_CONNECTION_STRING);

async function addData(record) {
    try {
        await client.connect();
        await client.db().collection(process.env.DB_COLLECTION).insertOne(record)
    }
    finally {
        await client.close();
    }
}

async function computeAveragePrice(inputData) {
    try {
        await client.connect();
        const minDate = Date.parse(inputData.start_date);
        const maxDate = Date.parse(inputData.end_date);
        const filter = {
            commodity: inputData.commodity,
            market: inputData.market,
            date: {
                "$gte": minDate,
                "$lte": maxDate
            }
        };
        const group = {
            "_id": 0,
            averagePrice: {
                "$avg": "$price"
            }
        };
        const cursor = await client.db().collection(process.env.DB_COLLECTION).
            aggregate([
                {
                    "$match": filter
                },
                {
                    "$group": group
                }
            ])
        const result = await cursor.toArray();
        let averagePrice = 0
        if (result.length > 0) {
            // use 2 decimal places to correspond with CSV input data.
            averagePrice = parseFloat(result[0].averagePrice.toFixed(2));
        }
        return {
            commodity: inputData.commodity,
            market: inputData.market,
            start_date: inputData.start_date,
            end_date: inputData.end_date,
            average_price: averagePrice
        };
    }
    finally {
        await client.close();
    }
}

module.exports = {
    client,
    addData,
    computeAveragePrice
};