const { createHandler } = require('graphql-http/lib/use/express');
const express = require('express');
const cors = require('cors');
const bodyParser = require("express").json;
const schema = require('../gql/schema');
const authMiddleware = require('../middleware/auth');
const sanitizeInput = require('../middleware/sanitize');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser());
app.use(sanitizeInput);

app.use('/', (req, res, next) => {
  const query = (req.body.query || '');
  if (query.includes('login') || query.includes('signup')) {
    return next();
  }
  authMiddleware(req, res, next);
});

app.use(createHandler({ schema }));

// Vercel wants a handler function exported
module.exports = (req, res) => app(req, res);
