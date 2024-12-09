import { Contact } from '../db/models/contact.js';

export const createNewContact = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};

export const updateContact = async (contactId, updateData, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true },
  );
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
};
