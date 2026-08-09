module.exports = {
  HOST: "ep-long-bar-axiezqi7-pooler.c-4.us-east-2.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_MsNvtpwR89VU",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};