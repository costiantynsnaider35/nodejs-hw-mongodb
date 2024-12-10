import createHttpError from 'http-errors';
import {
  createUser,
  loginUserService,
  logoutUserSession,
  refreshSessionTokens,
} from '../services/auth.js';
import { createAccessToken, createRefreshToken } from '../services/token.js';
import Session from '../db/models/session.model.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUserService(email, password);

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in an user!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(createHttpError(401, 'No refresh token found'));
    }

    const session = await Session.findOne({ refreshToken });

    if (!session) {
      return next(createHttpError(401, 'Invalid refresh token'));
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshSessionTokens(session.userId);

    await session.remove();

    await new Session({
      userId: session.userId,
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }).save();

    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(createHttpError(401, 'No refresh token found'));
    }

    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return next(createHttpError(401, 'No session ID found'));
    }

    await logoutUserSession(sessionId, refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
