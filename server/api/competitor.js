const express = require("express");
const _ = require("lodash");

const router = express.Router();

router.use((req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
});

router.get("/leaderboards", async (req, res) => {
  res.json({});
});

module.exports = router;
