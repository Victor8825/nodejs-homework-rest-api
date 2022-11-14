const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  updateUserSubscription,
};
