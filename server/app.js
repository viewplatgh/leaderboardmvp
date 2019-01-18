const express = require("express");
const session = require("express-session");
const mongoSessionStore = require("connect-mongo");
const next = require("next");
const mongoose = require("mongoose");

const api = require("./api");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";

const port = process.env.PORT || 8000;
const ROOT_URL = dev ? `http://localhost:${port}` : "https://mydomain.com";
const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true }
);

const sessionSecret = process.env.SESSION_SECRET;

const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.get("/static/*", (req, res) => {
    handle(req, res);
  });

  // confuring MongoDB session store
  const MongoStore = mongoSessionStore(session);
  const sess = {
    name: "leaderboard.sid",
    secret: sessionSecret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000
    }
  };

  server.use(session(sess));

  api(server);

  server.get("*", (req, res) => handle(req, res));

  // starting express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
