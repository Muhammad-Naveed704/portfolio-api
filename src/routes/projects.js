import { Router } from 'express';
import { getProjectBySlug, listProjects } from '../controllers/projectsController.js';

const router = Router();

router.get('/', listProjects);
router.get('/:slug', getProjectBySlug);

export default router;


