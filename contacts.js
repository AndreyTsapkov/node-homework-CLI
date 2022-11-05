const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const { writeFile } = require("fs");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contact = JSON.parse(data).find(({ id }) => id === contactId);
    console.table(contact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const newContactsList = JSON.parse(data).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf-8");
    console.log("Contact deleted");
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    const newContactsList = [...contactsList, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf-8");
    console.log(`${name} added to contacts`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
