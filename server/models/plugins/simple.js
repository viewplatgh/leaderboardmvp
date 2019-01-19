let util = require("util");
// var bcrypt = require("bcrypt");
let LocalStrategy = require("passport-local").Strategy;
let BadRequestError = function BadRequestError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = "BadRequestError";
  this.message = message || null;
};
util.inherits(BadRequestError, Error);

module.exports = (schema, options) => {
  options = options || {};
  options.rounds = options.rounds || 10;
  options.saltlen = options.saltlen || 32;
  options.iterations = options.iterations || 25000;
  options.keylen = options.keylen || 512;
  options.encoding = options.encoding || "hex";

  // Populate field names with defaults if not set
  options.usernameField = options.usernameField || "username";
  // option to convert username to lowercase when finding
  options.usernameLowerCase = options.usernameLowerCase || false;

  options.hashField = options.hashField || "hash";
  options.saltField = options.saltField || "salt";
  if (options.limitAttempts) {
    options.lastLoginField = options.lastLoginField || "last";
    options.attemptsField = options.attemptsField || "attempts";
    options.interval = options.interval || 100; // 100 ms
  }

  options.incorrectPasswordError =
    options.incorrectPasswordError || "Incorrect password";
  options.incorrectUsernameError =
    options.incorrectUsernameError || "Incorrect %s";
  options.missingUsernameError =
    options.missingUsernameError || "Field %s is not set";
  options.missingPasswordError =
    options.missingPasswordError || "Password is not set";
  options.userExistsError =
    options.userExistsError || "User already exists with %s %s";
  options.noSaltValueStoredError =
    options.noSaltValueStoredError ||
    "Authentication not possible. No salt value stored in mongodb collection.";
  options.attemptTooSoonError =
    options.attemptTooSoonError ||
    "Login attempted too soon after previous attempt";

  var schemaFields = {};
  if (!schema.path(options.usernameField)) {
    schemaFields[options.usernameField] = String;
  }
  schemaFields[options.hashField] = String;
  schemaFields[options.saltField] = String;
  if (options.limitAttempts) {
    schemaFields[options.attemptsField] = { type: Number, default: 0 };
    schemaFields[options.lastLoginField] = { type: Date, default: Date.now };
  }

  schema.add(schemaFields);

  schema.pre("save", function(next) {
    // if specified, convert the username to lowercase
    if (options.usernameLowerCase) {
      this[options.usernameField] = this[options.usernameField].toLowerCase();
    }

    // Mark this as local provider
    this["provider"] = "local";

    next();
  });

  schema.methods.setPassword = function(password, callback) {
    if (!password) {
      return callback(new BadRequestError(options.missingPasswordError));
    }

    var self = this;

    bcrypt.genSalt(options.rounds, function(err, salt) {
      if (err) {
        return callback(err);
      }

      bcrypt.hash(password, salt, function(err, encrypted) {
        if (err) {
          return callback(err);
        }

        self.set(options.hashField, encrypted);
        self.set(options.saltField, salt);

        callback(null, self);
      });
    });
  };

  schema.methods.authenticate = (password, callback) => {
    var self = this;
    if (
      options.limitAttempts &&
      Date.now() - this.get(options.lastLoginField) <
        Math.pow(options.interval, this.get(options.attemptsField) + 1)
    ) {
      // This login attempt is too soon after the previous attempt
      this.set(options.lastLoginField, Date.now());
      self.save();
      return callback(null, undefined, {
        message: options.attemptTooSoonError
      });
    }
    if (!this.get(options.saltField)) {
      return callback(null, undefined, {
        message: options.noSaltValueStoredError
      });
    }
    bcrypt.compare(password, self.get(options.hashField), function(err, same) {
      if (err) {
        return callback(err);
      }
      if (same) {
        if (options.limitAttempts) {
          self.set(options.lastLoginField, Date.now());
          self.set(options.attemptsField, 0);
          self.save();
        }
        return callback(null, self);
      } else {
        if (options.limitAttempts) {
          self.set(options.lastLoginField, Date.now());
          self.set(options.attemptsField, self.get(options.attemptsField) + 1);
          self.save();
        }
        return callback(null, undefined, {
          message: options.incorrectPasswordError
        });
      }
    });
  };

  schema.statics.publicFields = () => {
    return [
      "id",
      "username",
      "displayName",
      "email",
      "avatarUrl",
      "isReferee",
      "isGithubConnected"
    ];
  };

  schema.statics.authenticate = function() {
    var self = this;
    return function(username, password, callback) {
      console.log("self.findByUsername(username, async function(err, user) {");
      self.findByUsername(username, async function(err, user) {
        if (err) {
          return callback(err);
        }
        if (user) {
          return callback(null, user);
        } else {
          const url = `https://api.github.com/users/${username}`;

          try {
            const response = await fetch(url);
            if (response.ok) {
              console.log("Github fetch ok");
              const jsonProfile = await response.json();
              self.createUser(
                {
                  username: jsonProfile.login,
                  email: jsonProfile.email,
                  displayName: jsonProfile.name,
                  avatarUrl: jsonProfile.avatar_url
                },
                (err, user) => {
                  if (err) {
                    return callback(err);
                  }
                  return callback(null, user);
                }
              );
            } else {
              return callback(new Error("Failed to fetch github"));
            }
          } catch (error) {
            // throw res.status(500).json({ error: response.statusText });
            return callback(null, undefined, {
              message: "Error occured when authenticating"
            });
          }
        }
      });
    };
  };

  schema.statics.serializeUser = () => {
    return (user, callback) => {
      callback(null, user.get(options.usernameField));
    };
  };

  schema.statics.deserializeUser = function() {
    return (username, callback) => {
      this.findByUsername(username, callback);
    };
  };

  schema.statics.register = function(user, password, callback) {
    // Create an instance of this in case user isn't already an instance
    if (!(user instanceof this)) {
      user = new this(user);
    }

    if (!user.get(options.usernameField)) {
      return callback(
        new BadRequestError(
          util.format(options.missingUsernameError, options.usernameField)
        )
      );
    }

    var self = this;
    self.findByUsername(user.get(options.usernameField), function(
      err,
      existingUser
    ) {
      if (err) {
        return callback(err);
      }

      if (existingUser) {
        return callback(
          new BadRequestError(
            util.format(
              options.userExistsError,
              options.usernameField,
              user.get(options.usernameField)
            )
          )
        );
      }

      user.setPassword(password, function(err, user) {
        if (err) {
          return callback(err);
        }

        user.save(function(err) {
          if (err) {
            return callback(err);
          }

          callback(null, user);
        });
      });
    });
  };

  schema.statics.createUser = function(user, callback) {
    console.log("schema.statics.createUser");
    let newUser = new this({
      createdAt: new Date(),
      ...user
    });

    var self = this;
    self.findByUsername(user.username, (err, existingUser) => {
      if (err) {
        return callback(err);
      }

      if (existingUser) {
        return callback(
          new BadRequestError(
            util.format(
              options.userExistsError,
              options.usernameField,
              user.get(options.usernameField)
            )
          )
        );
      }
      newUser.save(function(err) {
        if (err) {
          return callback(err);
        }
        callback(null, newUser);
      });
    });
  };

  schema.statics.findByUsername = function(username, callback) {
    var queryParameters = {};

    // if specified, convert the username to lowercase
    if (username !== undefined && options.usernameLowerCase) {
      username = username.toLowerCase();
    }

    queryParameters[options.usernameField] = username;

    var query = this.findOne(queryParameters);
    if (options.selectFields) {
      query.select(options.selectFields);
    }

    if (options.populateFields) {
      query.populate(options.populateFields);
    }

    if (callback) {
      query.exec(callback);
    } else {
      return query;
    }
  };

  schema.statics.createStrategy = function() {
    console.log("schema.statics.createStrategy = function() { called");
    return new LocalStrategy(options, this.authenticate());
  };
};
