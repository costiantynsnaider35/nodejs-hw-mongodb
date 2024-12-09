import jwt from 'jsonwebtoken';

export const createAccessToken = (user) => {
  const payload = { userId: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

export const createRefreshToken = (user) => {
  const payload = { userId: user._id };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
};

export const refreshTokenHandler = (req, res) => {
  const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = createAccessToken(user);
    return res.json({
      status: 'success',
      message: 'Successfully refreshed token',
      data: {
        accessToken: newAccessToken,
      },
    });
  });
};
