import { Router } from 'express';
import { createProject, getProjectBySlug, listProjects, updateProject } from '../controllers/projectsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listProjects);
router.get('/:slug', getProjectBySlug);
router.post('/create', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);

export default router;


