import createHttpError from 'http-errors';
import {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  replaceContact,
  updateContact,
} from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getContacts();
  res.send({ status: 200, data: contacts });
}

export async function getContactController(req, res) {
  const { id } = req.params;
  const contact = await getContact(id);

  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.send({ status: 200, data: contact });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  };

  const result = await createContact(contact);
  res.status(201).send({
    status: 201,
    message: 'Contact created successfully',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { id } = req.params;
  const result = await deleteContact(id);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).send();
}

export async function replaceContactController(req, res) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  };

  const result = await replaceContact(id, contact);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  if (result.isNew === true) {
    return res.status(201).send({
      status: 201,
      message: 'Contact created successfully',
      data: result.contact,
    });
  }

  res.send({
    status: 200,
    message: 'Contact updated successfully',
    data: result.contact,
  });
}

export async function updateContactController(req, res) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  };

  const result = await updateContact(id, contact);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.send({
    status: 200,
    message: 'Contact updated successfully',
    data: result,
  });
}
