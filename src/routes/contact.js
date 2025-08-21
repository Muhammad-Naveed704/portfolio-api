import { Router } from 'express';
import { createMessage, listMessages } from '../controllers/contactController.js';
import requireApiKey from '../middleware/apiKey.js';

const router = Router();

router.post('/', createMessage);
router.get('/', requireApiKey, listMessages);

export default router;


