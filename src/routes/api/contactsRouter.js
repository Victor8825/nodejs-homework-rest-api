const express = require("express");

const { validationBody } = require("../../middleware/validationBody");

const {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContact,
} = require("../../middleware/validationScheme");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.post(
  "/",
  validationBody(schemaPostContact),
  asyncWrapper(addContactController)
);

router.put(
  "/:contactId",
  validationBody(schemaPutContact),
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validationBody(schemaPatchContact),
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
