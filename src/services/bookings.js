import Booking from '../db/models/booking.js';

export const createNewBooking = async (data) => {
  const booking = new Booking(data);
  return await booking.save();
};

export const getBookingById = async (id, userId) => {
  return await Booking.findOne({ _id: id, userId });
};

export const getBookingsByDate = async (date, userId) => {
  return await Booking.find({
    appointmentDate: {
      $gte: new Date(date),
      $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
    },
    userId,
  });
};

export const updateBooking = async (id, data, userId) => {
  return await Booking.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
  });
};

export const deleteBooking = async (id, userId) => {
  return await Booking.findOneAndDelete({ _id: id, userId });
};
