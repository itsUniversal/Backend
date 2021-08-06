const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const signToken = require("../util/signToken");
const validatePassword = require("../util/validatePassword");

exports.signUp = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      city,
      country,
      postalCode,
      aboutMe,
    } = req.body;

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      city,
      country,
      postalCode,
      aboutMe,
    });

    const token = await signToken(user._id);
    res.cookie("jwt", token);

    res.status(200).json({
      status: "Success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Email is incorrect!",
      });
    }

    const authorized = await validatePassword(password, user.password);
    if (!authorized) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
    const token = signToken(user._id);
    res.cookie("jwt", token);

    return res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.status(204).json({});
};

exports.protect = async (req, res, next) => {
  if (!req.headers.cookie.startsWith("jwt="))
    return res
      .status(401)
      .json({ status: "fail", message: "You're not logged in" });

  const token = req.headers.cookie.split("=")[1];

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "This user does no longer exist!",
    });
  }
  req.user = user;
  next();
};
