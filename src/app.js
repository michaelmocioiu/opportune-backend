const express = require("express");
const cors = require("cors");
const bodyParser = require("express").json;
const authMiddleware = require('./middleware/auth');
const sanitizeInput = require('./middleware/sanitize');
const uploadRoutes = require("./routes/uploadRoutes");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./gql/schema");
const path = require("path")

const app = express();

app.use(cors());
app.use(bodyParser());
app.use(sanitizeInput);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', (req, res, next) => {
    const query = req.body.query || '';
    if (query.includes('login') || query.includes('signup')) {
        console.log("hahahah")
        return next();
    }
    authMiddleware(req, res, next);
});

app.use("/graphql", createHandler({ schema: schema }));
app.use("/api/upload",  uploadRoutes);

module.exports = app;
