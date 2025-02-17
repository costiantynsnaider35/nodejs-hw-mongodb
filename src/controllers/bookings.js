import createHttpError from 'http-errors';
import {
  createNewBooking,
  getBookingById,
  getBookingsByDate,
  updateBooking,
  deleteBooking,
} from '../services/bookings.js';

// Получение всех записей на указанную дату
export const getBookingsByDateController = async (req, res, next) => {
  const { date } = req.query;
  try {
    const bookings = await getBookingsByDate(date, req.user._id);
    if (!bookings) {
      throw createHttpError(404, 'No bookings found for this date');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved bookings!',
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Создание новой записи
export const createBookingController = async (req, res, next) => {
  const { firstName, lastName, phone, appointmentDate } = req.body;
  try {
    const newBooking = await createNewBooking({
      firstName,
      lastName,
      phone,
      appointmentDate,
      userId: req.user._id,
    });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a booking!',
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
};

// Обновление записи
export const updateBookingController = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, phone, appointmentDate } = req.body;
  try {
    const booking = await getBookingById(id, req.user._id);
    if (!booking) {
      throw createHttpError(404, 'Booking not found');
    }
    const updatedBooking = await updateBooking(
      id,
      { firstName, lastName, phone, appointmentDate },
      req.user._id,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully updated the booking!',
      data: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// Удаление записи
export const deleteBookingController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await deleteBooking(id, req.user._id);
    if (!booking) {
      throw createHttpError(404, 'Booking not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
