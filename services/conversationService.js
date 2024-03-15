import conversationModel from "../models/conversationModel.js";

class ConversationService {
    async getUserConversations(initiatorUserId) {
        try {
            const conversations = await conversationModel.find({ participants: initiatorUserId })
            return conversations;
        } catch (error) {
            throw new Error("Failed to fetch conversations: " + error.message);
        }
    }

    async getConversationsByParticipants(participants) {
        try {
            const conversations = await conversationModel.find({ participants: { $all: participants } }).populate("messages");
            return conversations;
        } catch (error) {
            throw new Error("Failed to fetch conversations By Participants: " + error.message);
        }
    }

    async createP2PConversation(participants) {
        try {
            const existingConversation = await conversationModel.findOne({ participants: { $all: participants }, conversationType: "P2P" });
            if (existingConversation) {
                return existingConversation; 
            }

            const conversationType = "P2P"
            const data = { participants, conversationType};
            const conversation = new conversationModel(data);
            await conversation.save();
            return conversation;
        } catch (error) {
            throw new Error("Failed to create conversation: " + error.message);
        }    
    }

    async createGroupConversation(participants, groupName) {
        try {
            const data = { participants, groupName};
            const conversation = new conversationModel(data);
            await conversation.save();
            return conversation;
        } catch (error) {
            throw new Error("Failed to create conversation: " + error.message);
        }    
    }

    async addParticipantToGroup(participantId, conversationId) {
        try {
            const conversation = await conversationModel.findById(conversationId);
            if (!conversation) {
                throw new Error("Conversation not found");
            }
            if (conversation.participants.includes(participantId)) {
                throw new Error("Participant already exists in the conversation");
            }
            conversation.participants.push(participantId);
            await conversation.save();
            return conversation;
        } catch (error) {
            throw new Error("Failed to add participant to group: " + error.message);
        }
    }

    async removeParticipantFromGroup(participantId, conversationId) {
        try {
            const conversation = await conversationModel.findById(conversationId);
            if (!conversation) {
                throw new Error("Conversation not found");
            }
            const index = conversation.participants.indexOf(participantId);
            if (index === -1) {
                throw new Error("Participant not found in the conversation");
            }
            conversation.participants.splice(index, 1);
            await conversation.save();
            return conversation;
        } catch (error) {
            throw new Error("Failed to remove participant from group: " + error.message);
        }
    }
}

export default new ConversationService()