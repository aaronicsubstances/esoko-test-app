const dotenv = require('dotenv')

function config(envPath) {
    dotenv.config({ path: envPath })
}

module.exports = {
    config
}