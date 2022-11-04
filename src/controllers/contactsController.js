const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsController = async (_, res) => {
  const contacts = await getContacts();
  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({
      message: `contact with id ${req.params.contactId} wasn't found`,
    });
  } else {
    res.json(contact);
  }
};

const addContactController = async (req, res) => {
  const newContactCredentials = req.body;
  const newContact = await addContact(newContactCredentials);
  res.status(201).json(newContact);
};

const removeContactController = async (req, res) => {
  const removedContact = await removeContact(req.params.contactId);
  if (!removedContact) {
    res.status(404).json({
      message: `contact with id ${req.params.contactId} wasn't found`,
    });
  } else {
    res.json({ message: "contact was deleted" });
  }
};

const updateContactController = async (req, res) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updatedContact) {
    res.status(404).json({
      message: `contact with id ${req.params.contactId} wasn't found`,
    });
  } else {
    res.json(updatedContact);
  }
};

const updateStatusContactController = async (req, res) => {
  const updatedContact = await updateStatusContact(
    req.params.contactId,
    req.body
  );
  if (!updatedContact) {
    res.status(404).json({
      message: `contact with id ${req.params.contactId} wasn't found`,
    });
  } else {
    res.json(updatedContact);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
