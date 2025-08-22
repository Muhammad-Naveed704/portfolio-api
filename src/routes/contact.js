import { Router } from 'express';
import { createMessage, listMessages } from '../controllers/contactController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/create', createMessage);
router.get('/get', requireAuth, listMessages);

export default router;


