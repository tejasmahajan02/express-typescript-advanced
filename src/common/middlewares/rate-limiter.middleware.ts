import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  headers: true, // Send rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, etc.)
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: 'Too many requests, please try again later.' });
  },
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Too many password reset attempts. Try again later.',
  headers: true,
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: 'Too many password reset attempts. Try again later.' });
  },
});

export default limiter;
