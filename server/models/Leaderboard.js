const mongoose = require("mongoose");
const _ = require("lodash");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  competitors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  displayName: String,
  winPoints: {
    type: Number,
    default: 3
  },
  drawPoints: {
    type: Number,
    default: 1
  },
  lossPoints: {
    type: Number,
    default: 0
  },
  subscribeRequired: {
    type: Boolean,
    default: false
  }
});

class LeaderboardClass {
  static publicFields() {
    return [
      "id",
      "name",
      "createdAt",
      "displayName",
      "winPoints",
      "drawPoints",
      "lossPoints",
      "subscribeRequired"
    ];
  }

  static async createOne({ displayName }) {
    console.log("Creating one leaderboard");
    const newLeaderboard = await this.create({
      createdAt: new Date(),
      name: displayName.replace(" ", "").toLowerCase(),
      displayName
    });

    return _.pick(newLeaderboard, LeaderboardClass.publicFields());
  }
}

mongoSchema.loadClass(LeaderboardClass);

const Leaderboard = mongoose.model("Leaderboard", mongoSchema);

module.exports = Leaderboard;
