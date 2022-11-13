const express = require("express");

const { validationBody } = require("../../middleware/validationBody");

const {
  joiSchemaPostContact,
  joiSchemaPatchContact,
  joiSchemaPutContact,
} = require("../../middleware/contactValidationSchema");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const authorizationCheck = require("../../middleware/auth");

const router = express.Router();

router.get("/", authorizationCheck, asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.post(
  "/",
  authorizationCheck,
  validationBody(joiSchemaPostContact),
  asyncWrapper(addContactController)
);

router.put(
  "/:contactId",
  validationBody(joiSchemaPutContact),
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validationBody(joiSchemaPatchContact),
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
