import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getMessages, listConversations, sendMessage, sendAnonymousMessage, getAnonymousMessages } from '../controllers/chatController.js';

const router = Router();

router.get('/conversations', requireAuth, listConversations);
router.get('/messages/:userId', requireAuth, getMessages);
router.post('/messages', requireAuth, sendMessage);
// Anonymous visitor endpoints (no auth)
router.post('/anonymous/send', sendAnonymousMessage);
router.get('/anonymous/history', getAnonymousMessages);

export default router;


