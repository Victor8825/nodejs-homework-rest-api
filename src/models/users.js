const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const User = require("../db/userModel");

const userRegistration = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    return null;
  } else {
    const newUser = new User({ email, password });
    await newUser.save();
    return newUser;
  }
};

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return null;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  await User.findByIdAndUpdate(user._id, { token });
  const userApproved = {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
  return userApproved;
};

const userLogout = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { token: null });
  return user;
};

const updateUserSubscription = async (userId, field) => {
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, field, {
      new: true,
    });
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};

const updateAvatar = async (tmpFilePath, originalname, id) => {
  try {
    const imageName = `${id}_${originalname}`;
    const targetFilePath = path.join(
      process.cwd(),
      "src/public/avatars",
      imageName
    );
    const file = await Jimp.read(tmpFilePath);
    file.resize(250, 250).write(tmpFilePath);
    await fs.rename(tmpFilePath, targetFilePath);
    const avatarURL = path.join("public", "avatars", imageName);
    const updatedAvatar = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      {
        new: true,
      }
    );
    return updatedAvatar;
  } catch (error) {
    await fs.unlink(tmpFilePath);
    console.log(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  updateUserSubscription,
  updateAvatar,
};
