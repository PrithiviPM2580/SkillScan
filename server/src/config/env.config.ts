const ENV = {
  PORT: process.env["PORT"],
  NODE_ENV: process.env["NODE_ENV"],
  MONGO_URI: process.env["MONGO_URI"],
  JWT_SECRET: process.env["JWT_SECRET"],
  JWT_EXPIRES_IN: process.env["JWT_EXPIRES_IN"],
  JWT_COOKIE_EXPIRES_IN: process.env["JWT_COOKIE_EXPIRES_IN"],
  CLIENT_URL: process.env["CLIENT_URL"],
};

export default ENV;
