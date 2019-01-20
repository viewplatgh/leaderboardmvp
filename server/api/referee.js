const express = require("express");

const LeaderboardClass = require("../models/Leaderboard");

const dev = process.env.NODE_ENV !== "production";

const router = express.Router();

router.use((req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.isReferee) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
});

router.get("/leaderboards", async (req, res) => {
  const leaderboards = await LeaderboardClass.find({});
  res.status(200).json(leaderboards);
});

router.post("/leaderboards/create", async (req, res) => {
  try {
    const leaderboard = await LeaderboardClass.createOne({
      displayName: req.body.displayName
    });
    res.status(200).json(leaderboard);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: err.message || err.toString() });
  }
});

module.exports = router;
