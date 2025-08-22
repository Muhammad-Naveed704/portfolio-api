import { Router } from 'express';
import { createExperience, listExperience } from '../controllers/experienceController.js';
import requireApiKey from '../middleware/apiKey.js';

const router = Router();

router.get('/', listExperience);
router.post('/create',  createExperience);

export default router;


