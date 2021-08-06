const User = require("../models/UserModel");

exports.editUser = async (req, res) => {
    const filterObj = (obj, ...allowedFields) => {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        if (allowedFields.includes(key)) newObj[key] = obj[key];
      });
      return newObj;
    };
  
    const filteredBody = filterObj(
      req.body,
      "username",
      "firstName",
      "lastName",
      "city",
      "country",
      "postalCode",
      "aboutMe"
    );
  
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      status: "Success",
      data: {
        user: updatedUser,
      },
    });
  };