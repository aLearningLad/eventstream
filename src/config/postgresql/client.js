const { createClient } = require("@supabase/supabase-js");

const db_client = createClient(
  process.env.POSTGRESQL_DB_URL,
  process.env.POSTGRESQL_ANON_KEY
);

module.exports = db_client;
