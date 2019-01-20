const mongoose = require("mongoose");
const _ = require("lodash");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  displayName: String,
  createdAt: {
    type: Date,
    required: true
  },
  leaderboard: { type: Schema.Types.ObjectId, ref: "Leaderboard" },
  competitors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  winner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  drawer: [{ type: Schema.Types.ObjectId, ref: "User" }],
  loser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  round: Number
});

class ContestClass {
  static publicFields() {
    return [
      "id",
      "displayName",
      "createdAt",
      "leaderboard",
      "competitors",
      "winner",
      "drawer",
      "loser",
      "round"
    ];
  }

  static async createOne({
    displayName,
    leaderboard,
    competitors,
    winner,
    drawer,
    loser
  }) {
    const newContest = await this.create({
      createdAt: new Date(),
      displayName,
      leaderboard,
      competitors,
      winner,
      drawer,
      loser
    });

    return _.pick(newContest, ContestClass.publicFields());
  }
}

mongoSchema.loadClass(ContestClass);

const Contest = mongoose.model("Contest", mongoSchema);

module.exports = Contest;
