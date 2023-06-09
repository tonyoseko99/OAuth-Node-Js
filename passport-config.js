const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// import User model from Mongo DB schema

passport.use(
  new localStrategy({ usernameField: "email" }),
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Incorrect email or password" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return done(null, false, { message: "Incorrect email or password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
