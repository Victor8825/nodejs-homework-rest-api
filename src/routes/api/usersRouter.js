const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { validationBody } = require("../../middleware/validationBody");
const { upload } = require("../../middleware/uploadImage");

const {
  joiUserValidationSchema,
  joiUserSubscriptionUpdateValidationSchema,
} = require("../../middleware/userValidationSchema");

const {
  userSignupController,
  userLoginController,
  currentUserController,
  userLogoutController,
  updateUserSubscriptionController,
  updateAvatarController,
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
  "/subscription",
  authorizationCheck,
  validationBody(joiUserSubscriptionUpdateValidationSchema),
  asyncWrapper(updateUserSubscriptionController)
);

router.patch(
  "/avatars",
  authorizationCheck,
  upload.single("avatar"),
  asyncWrapper(updateAvatarController)
);

module.exports = router;
