const express = require("express");
const cors = require("cors");
const bodyParser = require("express").json;
const authMiddleware = require('./middleware/auth');
const sanitizeInput = require('./middleware/sanitize');

const app = express();

app.use(cors());
app.use(bodyParser());
app.use(sanitizeInput);

// Apply auth middleware to /graphql except for login and signup
app.use('/graphql', (req, res, next) => {
    const query = req.body.query || '';
    if (query.includes('login') || query.includes('signup')) {
        console.log("hahahah")
        return next();
    }
    authMiddleware(req, res, next);
});

module.exports = app;
