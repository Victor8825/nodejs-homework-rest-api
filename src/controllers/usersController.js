const requestError = require("../helpers/requestError");

const {
  userRegistration,
  userLogin,
  userLogout,
  updateUserSubscription,
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
    },
  });
};

const userLoginController = async (req, res) => {
  const userCredentials = req.body;
  const user = await userLogin(userCredentials);
  if (!user) {
    throw requestError(401, "email or password is wrong");
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

module.exports = {
  userSignupController,
  userLoginController,
  currentUserController,
  userLogoutController,
  updateUserSubscriptionController,
};
