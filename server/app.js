const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoSessionStore = require("connect-mongo");
const next = require("next");
const mongoose = require("mongoose");
const _ = require("lodash");
const { parse } = require("url");
const { join } = require("path");
const api = require("./api");
const { simpleLogin } = require("./utils/simpleLogin");
const User = require("./models/User");
const generateLeaderboard = require("./utils/generateLeaderboard");

mongoose.Promise = require("bluebird");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";

const port = process.env.PORT || 8000;
const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL;
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

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use("simple-login", User.createStrategy());

  server.use(passport.initialize());
  server.use(passport.session());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  api(server, passport);

  server.post("/login", (req, res, next) => {
    simpleLogin(passport, req, res, next);
  });

  server.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  const URL_MAP = {
    "/login": "/public/login"
  };

  const STATIC_FILES = [
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
    "/logo.jpg"
  ];

  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    if (_.has(URL_MAP, req.path)) {
      app.render(req, res, URL_MAP[req.path]);
    } else if (STATIC_FILES.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, "../static", parsedUrl.pathname);
      app.serveStatic(req, res, path);
    } else {
      handle(req, res);
    }
  });

  // DEBUG: generating data for demo:
  generateLeaderboard();

  // starting express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
