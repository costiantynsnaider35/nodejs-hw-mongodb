import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  const allContacts = await Contact.find();
  return allContacts;
};
export const getContactById = async (contactId) => {
  const oneContact = await Contact.findById(contactId);
  return oneContact;
};
