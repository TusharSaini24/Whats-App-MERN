const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, email, profilePic } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.json({
        msg: "user fetched successfully ",
        status: true,
        user,
      });
    }

    user = await User.create({
      username,
      email,
      profilePic,
    });

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "profilePic",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

// module.exports.getSearchContact = async (req, res, next) => {
//   try {
//     const users = await User.find({
//       $text: { $search: req.body.text, $caseSensitive: false },
//     }).select(["email", "username", "profilePic", "_id"]);
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };
