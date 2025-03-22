const express = require("express");
const cors = require("cors");
const bodyParser = require("express").json;
const authMiddleware = require('./middleware/auth');
const sanitizeInput = require('./middleware/sanitize');
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(bodyParser());
app.use(sanitizeInput);
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", uploadRoutes);

app.use('/graphql', (req, res, next) => {
    const query = req.body.query || '';
    if (query.includes('login') || query.includes('signup')) {
        console.log("hahahah")
        return next();
    }
    authMiddleware(req, res, next);
});

module.exports = app;
