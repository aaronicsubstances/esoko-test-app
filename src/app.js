const express = require('express');

const db = require("./db");

const app = express();

app.use(express.json());

app.get('/', function(req, res) {
    res.send("use post")
})

app.post('/', async function (req, res, next) {
    try {
        const avg = await db.computeAveragePrice(req.body)
        res.send({
            data: avg
        })
    }
    catch (err) {
        return next(err)
    }
})

module.exports = app; // for testing