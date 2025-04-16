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

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(bodyParser());
app.use(sanitizeInput);-
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', (req, res, next) => {
    const query = (req.body.query || '');
    console.log(req.body)
    if (query.includes('login') || query.includes('signup')) {
        return next();
    }
    authMiddleware(req, res, next);
});

app.use("/graphql", createHandler({ schema: schema }));
app.use("/api/upload",  uploadRoutes);

module.exports = app;
