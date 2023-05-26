// load environment variables first
require('./src/env').config();

const http = require('http')
const app = require("./src/app");

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log("Express started on port " + process.env.PORT)
})

// for testing
module.exports = server;