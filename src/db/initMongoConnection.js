import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
      process.env;
    await mongoose.connect(
      'mongodb + srv: Constantin89: Constantin89@contacts.ik3fx.mongodb.net/?retryWrites=true&w=majority&appName=contacts',
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
