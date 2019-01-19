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
  email: {
    type: String
  },
  competitors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  displayName: String,
  avatarUrl: String,
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
      "displayName",
      "email",
      "avatarUrl",
      "subscribeRequired"
    ];
  }

  static async createLeaderboard({ displayName }) {
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
