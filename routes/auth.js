const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signup", async (req, res, next) => {
  // handle user signup
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
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
