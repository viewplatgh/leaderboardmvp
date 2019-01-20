const simpleLoginApi = (passport, req, res, next) => {
  passport.authenticate("simple-login", (err, user, info, stat) => {
    if (err || !user)
      return res.status(500).json({ error: "Failed to authenticate" });
    req.logIn(user, err => {
      if (err) return next(err);

      return res.status(200).json({ payload: user });
    });
  })(req, res, next);
};
const simpleLogin = (passport, req, res, next) => {
  passport.authenticate("simple-login", (err, user, info, stat) => {
    console.log(
      `Hitting simple login callback, err: ${JSON.stringify(
        err,
        null,
        2
      )}, user: ${JSON.stringify(
        { username: user.username, displayname: user.displayName },
        null,
        2
      )}`
    );
    if (err || !user) {
      console.log("Simple login failed");
      return res.redirect("back");
    }
    req.logIn(user, err => {
      if (err) return next(err);

      user.isReferee = req.body.isreferee == "on";
      user.save();

      if (user.isReferee) {
        return res.redirect("/referee");
      } else {
        return res.redirect("/competitor");
      }
    });
  })(req, res, next);
};

module.exports = {
  simpleLoginApi,
  simpleLogin
};
