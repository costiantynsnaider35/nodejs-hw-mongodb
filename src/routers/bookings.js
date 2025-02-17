import express from 'express';
import {
  createBookingController,
  getBookingsByDateController,
  updateBookingController,
  deleteBookingController,
} from '../controllers/bookings.js';

const router = express.Router();

// Получение всех записей на указанную дату
router.get('/', getBookingsByDateController);

// Создание новой записи
router.post('/', createBookingController);

// Обновление записи
router.put('/:id', updateBookingController);

// Удаление записи по ID
router.delete('/:id', deleteBookingController);

export default router;
