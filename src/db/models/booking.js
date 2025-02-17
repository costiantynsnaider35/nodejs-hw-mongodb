import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
