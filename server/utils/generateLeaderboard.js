const _ = require("lodash");
const User = require("../models/User");
const Leaderboard = require("../models/Leaderboard");
const Contest = require("../models/Contest");

const leaderboard = "australianfootballleague";
const users = ["yagiz", "sindresorhus", "ulid", "pjialin"];

const generateLeaderboard = async () => {
  const yagiz = await User.findOne({ username: "yagiz" }).exec();
  const sindresorhus = await User.findOne({ username: "sindresorhus" }).exec();
  const ulid = await User.findOne({ username: "ulid" }).exec();
  const pjialin = await User.findOne({ username: "pjialin" }).exec();
  const afl = await Leaderboard.findOne({
    name: "australianfootballleague‎"
  }).exec();

  afl.competitors = [yagiz._id, sindresorhus._id, ulid._id, pjialin._id];
  await afl.save();

  await Contest.deleteMany({}).exec();

  await Contest.createOne({
    displayName: "yagiz VS sindresorhus",
    leaderboard: afl._id,
    competitors: [yagiz._id, sindresorhus._id],
    winners: [yagiz._id],
    drawers: [],
    losers: [sindresorhus._id]
  });

  await Contest.createOne({
    displayName: "yagiz VS ulid",
    leaderboard: afl._id,
    competitors: [yagiz._id, ulid._id],
    winners: [yagiz._id],
    drawers: [],
    losers: [ulid._id]
  });

  await Contest.createOne({
    displayName: "yagiz VS pjialin",
    leaderboard: afl._id,
    competitors: [yagiz._id, pjialin._id],
    winners: [pjialin._id],
    drawers: [],
    losers: [yagiz._id]
  });

  await Contest.createOne({
    displayName: "sindresorhus VS ulid",
    leaderboard: afl._id,
    competitors: [sindresorhus._id, ulid._id],
    winners: [],
    drawers: [sindresorhus._id, ulid._id],
    losers: []
  });

  await Contest.createOne({
    displayName: "sindresorhus VS pjialin",
    leaderboard: afl._id,
    competitors: [sindresorhus._id, pjialin._id],
    winners: [pjialin._id],
    drawers: [],
    losers: [sindresorhus._id]
  });

  await Contest.createOne({
    displayName: "ulid VS pjialin",
    leaderboard: afl._id,
    competitors: [ulid._id, pjialin._id],
    winners: [pjialin._id],
    drawers: [],
    losers: [ulid._id]
  });
};

module.exports = generateLeaderboard;
