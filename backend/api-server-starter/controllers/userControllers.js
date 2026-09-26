const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Create a JWT that stores the user's id and expires in 3 days
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// POST /api/users/signup
const signupUser = async (req, res) => {
  try {
    const user = await User.signup(req.body);
    const token = generateToken(user._id);
    res.status(201).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
