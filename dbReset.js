// load environment variables first
require('./src/env').config();

const db = require("./src/db");
const dataImporter = require("./src/dataImporter");

async function main() {
    await db.client.db().dropDatabase();
    const count = await dataImporter.parseAndStoreData(`${__dirname}/data/sample_market_price_data.csv`)
    console.log(`${count} records loaded`);
}

main()