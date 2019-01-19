const publicApi = require("./public");
const competitorApi = require("./competitor");
const refereeApi = require("./referee");
const express = require("express");
const router = express.Router();
const fetch = require("isomorphic-unfetch");

function api(server, passport) {
  server.use("/api/v1", publicApi(passport));
  server.use("/api/v1/competitor", competitorApi);
  server.use("/api/v1/referee", refereeApi);
}

module.exports = api;
