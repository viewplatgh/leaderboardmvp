const mongoose = require("mongoose");
const _ = require("lodash");
const passportSimple = require("./plugins/simple");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  googleId: {
    type: String,
    unique: true
  },
  googleToken: {
    access_token: String,
    refresh_token: String
  },
  createdAt: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  isReferee: {
    type: Boolean,
    default: false
  },
  username: String,
  password: String,
  displayName: String,
  avatarUrl: String,

  isGithubConnected: {
    type: Boolean,
    default: false
  },
  githubAccessToken: {
    type: String
  }
});

mongoSchema.plugin(passportSimple, {
  hashField: "password",
  limitAttempts: 9,
  lastLoginField: "lastLogin",
  interval: 1000
});

// class UserClass {
//   // User's public fields
//   static publicFields() {
//     return [
//       "id",
//       "username",
//       "displayName",
//       "email",
//       "avatarUrl",
//       "isReferee",
//       "isGithubConnected"
//     ];
//   }

//   static async signInOrSignUp({
//     googleId,
//     email,
//     googleToken,
//     displayName,
//     avatarUrl
//   }) {
//     const user = await this.findOne({ googleId }).select(
//       UserClass.publicFields().join(" ")
//     );

//     if (user) {
//       const modifier = {};

//       if (googleToken.accessToken) {
//         modifier.access_token = googleToken.accessToken;
//       }

//       if (googleToken.refreshToken) {
//         modifier.refresh_token = googleToken.refreshToken;
//       }

//       if (_.isEmpty(modifier)) {
//         return user;
//       }

//       await this.updateOne({ googleId }, { $set: modifier });

//       return user;
//     }

//     const newUser = await this.create({
//       createdAt: new Date(),
//       googleId,
//       email,
//       googleToken,
//       displayName,
//       avatarUrl
//     });

//     return _.pick(newUser, UserClass.publicFields());
//   }
// }

// mongoSchema.loadClass(UserClass);

const User = mongoose.model("User", mongoSchema);

module.exports = User;
