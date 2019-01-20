const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");
const Leaderboard = require("../models/Leaderboard");
const Contest = require("../models/Contest");
const { simpleLoginApi } = require("../utils/simpleLogin");
const router = express.Router();

module.exports = passport => {
  router.post("/login", (req, res, next) => {
    simpleLoginApi(passport, req, res, next);
  });

  router.get("/leaderboards", async (req, res) => {
    try {
      res.json({});
    } catch (err) {
      res.json({ error: err.message || err.toString() });
    }
  });

  router.get("/oneleaderboard", async (req, res) => {
    try {
      const afl = await Leaderboard.findOne({
        name: "australianfootballleague‎"
      })
        .populate("competitors")
        .lean()
        .exec();

      const rows = [];
      await mongoose.Promise.mapSeries(afl.competitors, comp => {
        let wins, draws, loses;

        return Contest.countDocuments({
          leaderboard: afl._id,
          winners: comp._id
        })
          .exec()
          .then(count => {
            wins = count;
            return Contest.countDocuments({
              leaderboard: afl._id,
              drawers: comp._id
            })
              .exec()
              .then(count => {
                draws = count;
                return Contest.countDocuments({
                  leaderboard: afl._id,
                  losers: comp._id
                })
                  .exec()
                  .then(count => {
                    loses = count;
                  });
              });
          })
          .then(() => {
            rows.push({
              competitor: comp,
              wins,
              draws,
              loses,
              points:
                afl.winPoints * wins + afl.drawPoints * draws + afl.lossPoints
            });
          });
      });

      rows.sort((a, b) => b.points - a.points);

      res.json({ leaderboard: afl, rows });
    } catch (err) {
      res.json({ error: err.message || err.toString() });
    }
  });
  return router;
};
