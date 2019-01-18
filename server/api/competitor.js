const express = require("express");
const _ = require("lodash");

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user || !req.user.isCompetitor) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
});

router.get("/leaderboards", async (req, res) => {
  res.json({});
});

module.exports = router;
