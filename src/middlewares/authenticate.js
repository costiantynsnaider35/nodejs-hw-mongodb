import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return next(createHttpError(401, 'No access token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch {
    next(createHttpError(401, 'Access token expired'));
  }
};
