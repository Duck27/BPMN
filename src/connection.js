const { Client } = import("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "1",
  database: "api",
});

module.exports = client;
