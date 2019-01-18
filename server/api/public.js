const express = require("express");
const _ = require("lodash");

const router = express.Router();

router.get("/leaderboards", async (req, res) => {
  try {
    // const books = await Book.list();
    // res.json(books);
    res.json({});
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
