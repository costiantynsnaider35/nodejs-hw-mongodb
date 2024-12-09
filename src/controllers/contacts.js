import createHttpError from 'http-errors';
import {
  createNewContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { Contact } from '../db/models/contact.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const filter = parseFilterParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const userId = req.user._id;
    const contacts = await Contact.find({ userId, ...filter })
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalItems = await Contact.countDocuments({ userId, ...filter });
    const totalPages = Math.ceil(totalItems / perPage);

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    res.status(200).send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userId = req.user._id;
    const contact = await Contact.findOne({ _id: id, userId });
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).send({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const newContact = await createNewContact({ ...req.body, userId });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userId = req.user._id;
    const updatedContact = await updateContact(id, { ...req.body, userId });
    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userId = req.user._id;
    const contact = await deleteContact(id, userId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
