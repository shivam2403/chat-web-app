import express from 'express';
import { sendMessage,getMessage } from '../controllers/messageController.js';
import protectRoute  from '../middleware/protectRoute.js';

const router=express.Router();

router.get('/:id',protectRoute, getMessage);// id of the person between whom and us we want to receive the messages
router.post('/send/:id',protectRoute, sendMessage);// id is of the user to which we want to send the message(receiverId)

export default router