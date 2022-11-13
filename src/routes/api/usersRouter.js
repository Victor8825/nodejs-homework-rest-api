const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { validationBody } = require("../../middleware/validationBody");
const {
  joiUserValidationSchema,
} = require("../../middleware/userValidationSchema");

const {
  userSignupController,
  userLoginController,
  currentUserController,
  userLogoutController,
  updateUserSubscriptionController,
} = require("../../controllers/usersController");

const authorizationCheck = require("../../middleware/auth");

const router = express.Router();

router.post(
  "/signup",
  validationBody(joiUserValidationSchema),
  asyncWrapper(userSignupController)
);

router.post(
  "/login",
  validationBody(joiUserValidationSchema),
  asyncWrapper(userLoginController)
);

router.get("/logout", authorizationCheck, asyncWrapper(userLogoutController));

router.get("/current", authorizationCheck, asyncWrapper(currentUserController));

router.patch(
  "/",
  authorizationCheck,
  asyncWrapper(updateUserSubscriptionController)
);

module.exports = router;
