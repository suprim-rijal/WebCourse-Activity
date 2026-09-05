const User = require("../models/userModel");

// GET /users
const getAllUsers = (req, res) => {
  const users = User.getAll(); // Match the model export
  res.json(users);
};

// POST /users
const createUser = (req, res) => {
  // Use the spread syntax as requested in Step 5 of the lab
  const newUser = User.addOne({ ...req.body });
  
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ message: "Missing required user fields" });
  }
};

// GET /users/:userId
const getUserById = (req, res) => {
  const { userId } = req.params;
  const user = User.findById(userId); // Match the model export
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// PUT /users/:userId
const updateUser = (req, res) => {
  const { userId } = req.params;
  // Pass the whole body object rather than individual fields
  const updatedUser = User.updateOneById(userId, { ...req.body });
  
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// DELETE /users/:userId
const deleteUser = (req, res) => {
  const { userId } = req.params;
  const isDeleted = User.deleteOneById(userId); // Actually delete it
  
  if (isDeleted) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};