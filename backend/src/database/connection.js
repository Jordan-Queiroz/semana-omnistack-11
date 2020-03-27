/**
 * Create the database connection
 */

// Load knex
const knex = require('knex');
// Load configuration file
const configuration = require('../../knexfile');
// Make connection with dev env
const connection = knex(configuration.development);
// Export connection, so other files can use it
module.exports = connection;