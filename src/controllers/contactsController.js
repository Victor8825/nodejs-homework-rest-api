const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const requestError = require("../helpers/requestError");

const getContactsController = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const contacts = await getContacts(page, limit, _id, favorite);
  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    throw requestError(
      404,
      `contact with id ${req.params.contactId} wasn't found`
    );
  } else {
    res.json(contact);
  }
};

const addContactController = async (req, res) => {
  const newContactCredentials = req.body;
  const { _id } = req.user;
  const newContact = await addContact(newContactCredentials, _id);
  res.status(201).json(newContact);
};

const removeContactController = async (req, res) => {
  const removedContact = await removeContact(req.params.contactId);
  if (!removedContact) {
    throw requestError(
      404,
      `contact with id ${req.params.contactId} wasn't found`
    );
  } else {
    res.json({ message: "contact was deleted" });
  }
};

const updateContactController = async (req, res) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updatedContact) {
    throw requestError(
      404,
      `contact with id ${req.params.contactId} wasn't found`
    );
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
    throw requestError(
      404,
      `contact with id ${req.params.contactId} wasn't found`
    );
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
