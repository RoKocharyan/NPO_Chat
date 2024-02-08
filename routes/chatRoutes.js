import chatController from "../controllers/chatController.js";
import express from "express";
const chatRouter = express.Router();

chatRouter.get('/', chatController.getAll);


export default chatRouter;