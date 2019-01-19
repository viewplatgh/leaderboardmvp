const express = require("express");
const _ = require("lodash");
const { simpleLoginApi } = require("../utils/simpleLogin");
const router = express.Router();

module.exports = passport => {
  router.post("/login", (req, res, next) => {
    // const url = `https://api.github.com/users/${req.body.username}`;
    // try {
    //   const response = await fetch(url);
    //   if (response.ok) {
    //     const { id } = await response.json();
    //     res.json({ token: id });
    //   } else {
    //     res.status(401).json({ error: response.statusText });
    //   }
    // } catch (error) {
    //   throw res.status(500).json({ error: response.statusText });
    // }
    simpleLoginApi(passport, req, res, next);
  });

  router.get("/leaderboards", async (req, res) => {
    try {
      // const books = await Book.list();
      // res.json(books);
      res.json({});
    } catch (err) {
      res.json({ error: err.message || err.toString() });
    }
  });
  return router;
};
