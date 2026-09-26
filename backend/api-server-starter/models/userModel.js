const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // stored hashed
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  },
  { timestamps: true, versionKey: false },
);

// Static signup method: validates input, hashes the password, creates the user
userSchema.statics.signup = async function (userData) {
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    address,
  } = userData;

  if (
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !gender ||
    !date_of_birth ||
    !address?.street ||
    !address?.city ||
    !address?.zipCode
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough (min 8 chars, upper & lower case, number, symbol)",
    );
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    phone_number,
    gender,
    date_of_birth,
    address,
  });

  return user;
};

// Static login method: finds the user and checks the password
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
