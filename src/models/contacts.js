const Contact = require("../db/contactModel");

const getContacts = async () => {
  const contacts = await await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });
    return contact || null;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  try {
    const newContact = await Contact.create({ name, email, phone, favorite });
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await Contact.findByIdAndRemove({ _id: contactId });
    return removedContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, updates) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      updates,
      { new: true }
    );
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
};

const updateStatusContact = async (contactId, field) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      field,
      { new: true }
    );
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
