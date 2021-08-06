const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username!"],
    unique: [true, "This username already in use!"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email!"],
    unique: [true, "This email already in use!"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "A user must have a password!"],
    validate: (el) => {
      return el.length >= 6 && el.length <= 32;
    },
  },
  firstName: String,
  lastName: String,
  city: String,
  country: String,
  postalCode: Number,
  aboutMe: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
