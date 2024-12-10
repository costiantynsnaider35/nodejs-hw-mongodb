import { Contact } from '../db/models/contact.js';

export const createNewContact = async (data) => {
  return Contact.create(data);
};

export const getContactById = async (id, userId) => {
  return Contact.findOne({ _id: id, userId });
};

export const updateContact = async (id, updateData, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, userId },
    updateData,
    { new: true },
  );
  return contact;
};

export const deleteContact = async (id, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: id, userId });
  return contact;
};
