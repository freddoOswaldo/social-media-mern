import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */

export const register = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...req.body,
      password: passwordHash,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const saveUser = await newUser.save();
    res.status(201).json({ user: saveUser });
  } catch (error) {
    console.error("🤕 ~ file: auth.js:22 ~ register ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User or Password is incorrect" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "User or Password is incorrectt" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("🤕 ~ file: auth.js:41 ~ login ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};
