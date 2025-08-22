import { Router } from 'express';
import { createExperience, listExperience, updateExperience, getExperienceById } from '../controllers/experienceController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listExperience);
router.get('/:id', getExperienceById);
router.post('/create', requireAuth, createExperience);
router.put('/:id', requireAuth, updateExperience);

export default router;


