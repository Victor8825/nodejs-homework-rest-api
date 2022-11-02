const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contactsRaw = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsRaw);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const db = await listContacts();
    const contact = db.find(({ id }) => id === contactId);
    return contact || null;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const db = await listContacts();
    const idx = db.findIndex(({ id }) => id === contactId);
    if (idx === -1) {
      return null;
    }
    const [removedContact] = db.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(db));
    return removedContact;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const db = await listContacts();
    const id = nanoid();
    const newContact = { id, ...body };
    db.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(db));
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const db = await listContacts();
    const idx = db.findIndex(({ id }) => id === contactId);
    if (idx === -1) {
      return null;
    }
    const updatedContact = db[idx];
    const keys = Object.keys(body);
    for (const key of keys) {
      updatedContact[key] = body[key];
    }
    await fs.writeFile(contactsPath, JSON.stringify(db));
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
