/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select(*).where(true)
 */

const cors = require('cors');
// Import express
const express = require('express');
// Import routes
const routes = require('./routes');

// Instantiate the app
const app = express();

app.use(cors());

// Make every body param be casted from json into a JavaScript object
app.use(express.json());

// Use the routes from ./routes.js
app.use(routes);

// Make the app listen (start)
app.listen(3333);