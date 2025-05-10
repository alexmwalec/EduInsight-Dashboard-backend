const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Eduinsight',
  password: 'alex3376',
  port: 5432,
});

module.exports = pool;
