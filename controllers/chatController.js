import db from "../models/dbConnection.js";
import messageService from "../services/messageService.js";
import conversationService from "../services/conversationService.js";
const messages = db.Messages;

// 1. CreateConversation (participants, messageBody == null, groupName = null)
//                         if participants. count > 2 createGroup;
// 2. RemoveParticipantFromGroup(participantId, conversationId)
// 3. AddParticipantToGroup(participantId, conversationId)


class ChatController {
    async getUserConversations(req, res) {
        const initiatorUserId = req.params.userId; 
        try {
            const conversations = await conversationService.getUserConversations(initiatorUserId);
            res.json({ conversations });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async sendMessage(req, res) {
        try {
            const {head, body} = req.body.message;
            const message = await messageService.sendMessage(head, body);
            if (!message) {
                return res.status(400).json({ error: "Conversation not found or sender not in conversation participants"});            
            }
            return res.send({data : message})
        }
        catch(err) {
            console.log(err);
            return res.status(400).send(err)
        }
    }
    
    async getConversationsByParticipants(req, res) {
        const participants = req.params.participants
        console.log(participants)
        try {
            const conversations = await conversationService.getConversationsByParticipants([]);
            res.json({ conversations });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createConversation(req, res) {
        try {
            const { participants, message = null, groupName = null } = req.body;
            
            if (participants.length > 2) {
                if (!groupName) {
                    return res.status(400).json({ message: "Group name is required for group conversation" });
                }
    
                const conversation = await conversationService.createGroupConversation(participants, groupName);
    
                if (message) {
                    message.head.conversationId = conversation.id;
                    await messageService.sendMessage(message.head, message.body);
                    return res.status(200).json({ data: conversation, message: "Group conversation and message sent successfully" });
                }
    
                return res.status(200).json({ data: conversation, message: "Group conversation created successfully" });
            }
    
            if (!message) {
                return res.status(400).json({ message: "Message is required for peer-to-peer conversation" });
            }
    
            const conversation = await conversationService.createP2PConversation(participants);
            message.head.conversationId = conversation.id;
            await messageService.sendMessage(message.head, message.body);
    
            return res.status(200).json({ data: conversation, message: "Peer-to-peer conversation and message sent successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    
    async removeParticipantFromGroup(req, res) {
        const { participantId, conversationId } = req.body;
        try {
            const conversation = await conversationService.removeParticipantFromGroup(participantId, conversationId);
            return res.status(200).json({ message: "Participant removed successfully", data: conversation });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async addParticipantToGroup(req, res) {
        const { participantId, conversationId } = req.body;
        try {
            const conversation = await conversationService.addParticipantToGroup(participantId, conversationId);
            return res.status(200).json({ message: "Participant added successfully", data: conversation });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}

export default new ChatController();