const publicApi = require("./public");
const competitorApi = require("./competitor");
const refereeApi = require("./referee");
const express = require("express");
const router = express.Router();
const fetch = require("isomorphic-unfetch");

function api(server) {
  server.use(
    "/api/v1",
    router.post("/login", async (req, res) => {
      const url = `https://api.github.com/users/${req.body.username}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const { id } = await response.json();
          res.json({ token: id });
        } else {
          res.status(401).json({ error: response.statusText });
        }
      } catch (error) {
        throw res.status(500).json({ error: response.statusText });
      }
    })
  );

  server.use("/api/v1/public", publicApi);
  server.use("/api/v1/competitor", competitorApi);
  server.use("/api/v1/referee", refereeApi);
}

module.exports = api;
