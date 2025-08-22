import { Router } from 'express';
import { createProject, getProjectBySlug, listProjects } from '../controllers/projectsController.js';
import requireApiKey from '../middleware/apiKey.js';

const router = Router();

router.get('/', listProjects);
router.get('/:slug', getProjectBySlug);
router.post('/create', requireApiKey, createProject);

export default router;


