export default function requireApiKey(req, res, next) {
  const incoming = req.headers['x-api-key'];
  if (!incoming || incoming !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}


