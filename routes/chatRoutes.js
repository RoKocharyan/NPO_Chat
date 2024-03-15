import chatController from "../controllers/chatController.js";
import express from "express";
const chatRouter = express.Router();

chatRouter.post('/message', chatController.sendMessage) // PLUS
chatRouter.post('/conversation', chatController.createConversation) //  PLUS 
chatRouter.get('/conversation/:userId', chatController.getUserConversations); // PLUS
chatRouter.post('/conversation/addParticipant', chatController.addParticipantToGroup); // PLUS
chatRouter.post('/conversation/removeParticipant', chatController.removeParticipantFromGroup); // PLUS

chatRouter.get('/:participants', chatController.getConversationsByParticipants);



export default chatRouter;