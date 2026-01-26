// prisma.config.js
// CommonJS programmatic Prisma config for Prisma v7+ CLI.
// Loads .env so `process.env.DATABASE_URL` is available when the CLI loads this file.
const { defineConfig } = require("prisma/config");
require('dotenv').config({ path: '.env' });

module.exports = defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
