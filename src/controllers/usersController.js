const requestError = require("../helpers/requestError");

const {
  userRegistration,
  userLogin,
  userLogout,
  updateUserSubscription,
  updateAvatar,
  userVerification,
  checkUserVerification,
} = require("../models/users");

const userSignupController = async (req, res) => {
  const userCredentials = req.body;
  const user = await userRegistration(userCredentials);
  if (!user) {
    throw requestError(409, `this email: ${userCredentials.email} in use`);
  }
  res.status(201).json({
    user: {
      email: user.email,
      subscription: "starter",
      verificationToken: user.verificationToken,
    },
  });
};

const userLoginController = async (req, res) => {
  const userCredentials = req.body;
  const user = await userLogin(userCredentials);
  if (!user) {
    throw requestError(
      401,
      "email is wrong or not verified or password is wrong"
    );
  }
  res.status(200).json(user);
};

const currentUserController = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const userLogoutController = async (req, res) => {
  const { _id } = req.user;
  const user = await userLogout(_id);
  if (!user) {
    throw requestError(401, "Not authorized");
  } else {
    res.status(204).json();
  }
};

const updateUserSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await updateUserSubscription(_id, req.body);
  if (!updatedUser) {
    throw requestError(
      404,
      `user with id ${req.params.contactId} wasn't found`
    );
  } else {
    res.json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  }
};

const updateAvatarController = async (req, res) => {
  const { path: tmpFilePath, originalname } = req.file;
  const { _id: id } = req.user;
  const updatedAvatar = await updateAvatar(tmpFilePath, originalname, id);
  if (!updatedAvatar) {
    throw requestError(401, "Not authorized");
  } else {
    res.status(200).json(`avatarURL : ${updatedAvatar.avatarURL}`);
  }
};

const userVerificationController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await userVerification(verificationToken);
  user
    ? res.status(200).json({ message: "Verification succesful" })
    : res.status(404).json({ message: "Not found" });
};

const checkUserVerificationController = async (req, res) => {
  const { email } = req.body;
  const user = await checkUserVerification(email);
  user
    ? res.status(200).json({ message: "Verification email sent" })
    : res
        .status(400)
        .json({
          message:
            "Verification has already been passed or there is no such a user in DB",
        });
};

module.exports = {
  userSignupController,
  userLoginController,
  currentUserController,
  userLogoutController,
  updateUserSubscriptionController,
  updateAvatarController,
  userVerificationController,
  checkUserVerificationController,
};
