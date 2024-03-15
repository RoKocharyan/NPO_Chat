import dbConfig from "../config/dbConfig.js";
import mongoose from "mongoose";
import messageModel from "./messageModel.js";
import conversationModel from "./conversationModel.js"; 

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Messages = messageModel;
db.Conversations = conversationModel; 

export default db;
