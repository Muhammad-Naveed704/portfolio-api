import Experience from '../models/Experience.js';

export async function listExperience(req, res, next) {
  try {
    const items = await Experience.find({}).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createExperience(req, res, next) {
  try {
    const { company, title, period, bullets = [], location, website, order = 0 } = req.body;
    if (!company || !title || !period) return res.status(400).json({ message: 'company, title, period required' });
    const doc = await Experience.create({ company, title, period, bullets, location, website, order });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}


