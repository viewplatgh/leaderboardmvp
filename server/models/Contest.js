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
  winners: [{ type: Schema.Types.ObjectId, ref: "User" }],
  drawers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  losers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  round: { type: Number, default: 0 }
});

class ContestClass {
  static publicFields() {
    return [
      "id",
      "displayName",
      "createdAt",
      "leaderboard",
      "competitors",
      "winners",
      "drawers",
      "losers",
      "round"
    ];
  }

  static async createOne({
    displayName,
    leaderboard,
    competitors,
    winners,
    drawers,
    losers
  }) {
    const newContest = await this.create({
      createdAt: new Date(),
      displayName,
      leaderboard,
      competitors,
      winners,
      drawers,
      losers
    });

    return _.pick(newContest, ContestClass.publicFields());
  }
}

mongoSchema.loadClass(ContestClass);

const Contest = mongoose.model("Contest", mongoSchema);

module.exports = Contest;
