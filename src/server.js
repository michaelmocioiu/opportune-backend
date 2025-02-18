const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./gql/schema");
const connectDB = require('./config/db');
require("dotenv").config();

const app = require("./app");
connectDB();

// Mount the routes
app.use("/graphql", createHandler({ schema: schema }));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));