import { Router } from 'express';
import { createExperience, listExperience, updateExperience, getExperienceById } from '../controllers/experienceController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', listExperience);
router.get('/:id', getExperienceById);
router.post('/create', requireAuth, upload.single('logo'), createExperience);
router.put('/:id', requireAuth, updateExperience);

export default router;


