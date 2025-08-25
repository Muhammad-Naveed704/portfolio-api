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
    const logo = req.file ? `/uploads/${req.file.filename}` : undefined;
    const doc = await Experience.create({ company, title, period, bullets, location, website, order, logo });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function updateExperience(req, res, next) {
  try {
    const { id } = req.params;
    const payload = req.body || {};
    const updated = await Experience.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: 'Experience not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function getExperienceById(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Experience.findById(id);
    if (!doc) return res.status(404).json({ message: 'Experience not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}


