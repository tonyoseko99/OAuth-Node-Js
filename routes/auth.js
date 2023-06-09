const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
  // handle user signup
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }

      //   generate and return a jwt token
      const token = jwt.sign({ id: user.id }, "your-secret-key");
      return res.json({ token });
    });
  }),
    (req, res);
});

module.exports - router;
