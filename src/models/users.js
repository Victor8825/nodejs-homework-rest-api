const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const User = require("../db/userModel");
const { nanoid } = require("nanoid");
const sendMail = require("../helpers/sendVerificationEmail");

const userRegistration = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    return null;
  } else {
    const verificationToken = nanoid();
    const newUser = User.create({ email, password, verificationToken });
    const mail = {
      to: email,
      subject: "Email verification",
      text: `<p> Click <a target="_blank" href="http://localhost:3000/api/users/auth/verify/${verificationToken} "> here to confirm</a></p>`,
      hmtl: `<p> Click <a target="_blank" href="http://localhost:3000/api/users/auth/verify/${verificationToken} "> here to confirm</a></p>`,
    };
    await sendMail(mail);
    return newUser;
  }
};

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ email, verify: true });
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

const userVerification = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    },
    { new: true }
  );
  if (!user) return null;
  return user;
};

const checkUserVerification = async (email) => {
  const user = await User.findOne({ email, verify: false });
  if (!user) return null;
  const mail = {
    to: email,
    subject: "Reverification",
    text: `<p> Click <a target="_blank" href="http://localhost:3000/api/users/auth/verify/${user.verificationToken} "> here to confirm</a></p>`,
    hmtl: `<p> Click <a target="_blank" href="http://localhost:3000/api/users/auth/verify/${user.verificationToken} "> here to confirm</a></p>`,
  };
  await sendMail(mail);
  return user;
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  updateUserSubscription,
  updateAvatar,
  userVerification,
  checkUserVerification,
};
