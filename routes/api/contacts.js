const express = require("express");
const { nanoid } = require("nanoid");
const { validationBody } = require("../../middleware/validationBody");
const {
  schemaPostContact,
  schemaPutContact,
} = require("../../schemes/validationScheme");

const actions = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await actions.listContacts());
});

router.get("/:contactId", async (req, res) => {
  const contact = await actions.getContactById(req.params.contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", validationBody(schemaPostContact), async (req, res, next) => {
  const { name, email, phone } = req.body;
  const id = nanoid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  await actions.addContact(newContact);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res) => {
  const removedContact = await actions.removeContact(req.params.contactId);
  if (!removedContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put(
  "/:contactId",
  validationBody(schemaPutContact),
  async (req, res) => {
    const { name, email, phone } = req.body;
    const contactId = req.params.contactId;
    const bodyForUpdate = {
      name,
      email,
      phone,
    };
    const updatedContact = await actions.updateContact(
      contactId,
      bodyForUpdate
    );
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(updatedContact);
    }
  }
);

module.exports = router;
