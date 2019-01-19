const express = require("express");

const dev = process.env.NODE_ENV !== "production";

const router = express.Router();

router.use((req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.isReferee) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
});

router.get("/leaderboards", async (req, res) => {
  res.json({});
});

router.post("/leaderboards/add", async (req, res) => {
  try {
    // const leaderboard = await Leaderboard.add(
    //   Object.assign({ userId: req.user.id }, req.body)
    // );
    // res.json(book);
    res.json({});
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
