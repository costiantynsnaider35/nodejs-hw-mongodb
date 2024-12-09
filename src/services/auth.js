import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.model.js';
import Session from '../db/models/session.model.js';

export const createUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new Error('Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.deleteOne({ userId: user._id });

  return user;
};

export const refreshSessionTokens = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' },
  );

  return { accessToken, refreshToken };
};

export const logoutUserSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId });

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.refreshToken !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  await session.remove();
};
