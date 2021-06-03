import express from "express";

import bcrypt from "bcryptjs";

import User from "../models/userModel";

const userRouter = express.Router();

userRouter.post("/api/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });
  } else {
    res.status(401).send({
      msg: "Something is wrong. Please try again.",
    });
  }
});
