import messageModel from "../models/messageModel.js"
import conversationModel from "../models/conversationModel.js";
import conversationService from "../services/conversationService.js"; 

class MessageService {
    async sendMessage(head, body) {
        const conversationId = head.conversationId
        const from = head.from
        const conversation = await conversationModel.findById(conversationId);

        if (!conversation || !conversation.participants.includes(from)) {
            return null
        }
    
        if (conversation) {
            const data = { head, body };
            const message = new messageModel(data);
            await message.save();
    
            conversation.messages.push(message);
            await conversation.save();
    
            return message;
        } else {
            // Bad Request
        }
    }
}

export default new MessageService()