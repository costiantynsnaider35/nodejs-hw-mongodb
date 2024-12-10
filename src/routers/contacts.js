import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { contactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', authenticate, ctrlWrapper(getAllContacts));
router.get('/:id', authenticate, isValidId, ctrlWrapper(getContactById));
router.post(
  '/',
  jsonParser,
  authenticate,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:id',
  jsonParser,
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
router.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
