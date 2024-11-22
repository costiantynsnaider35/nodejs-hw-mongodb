import express from 'express';
import {
  getContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  replaceContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.put('/:id', jsonParser, ctrlWrapper(replaceContactController));

router.patch('/:id', jsonParser, ctrlWrapper(updateContactController));

export default router;
