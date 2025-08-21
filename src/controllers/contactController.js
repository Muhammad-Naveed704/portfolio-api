import ContactMessage from '../models/ContactMessage.js';

export async function createMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const doc = await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: 'Message received', id: doc._id });
  } catch (err) {
    next(err);
  }
}


