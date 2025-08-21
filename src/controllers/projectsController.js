import Project from '../models/Project.js';

export async function listProjects(req, res, next) {
  try {
    const { tag, featured } = req.query;
    const query = {};
    if (tag) query.tags = tag;
    if (featured) query.featured = featured === 'true';
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

export async function getProjectBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const payload = req.body || {};
    if (!payload.title || !payload.slug || !payload.description) {
      return res.status(400).json({ message: 'title, slug, description required' });
    }
    const exists = await Project.findOne({ slug: payload.slug });
    if (exists) return res.status(409).json({ message: 'Slug already exists' });
    const doc = await Project.create(payload);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}


