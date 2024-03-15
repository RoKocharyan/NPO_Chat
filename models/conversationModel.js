import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    conversationId : {type: Schema.Types.ObjectId},
    participants: [{ type: Number }],
    groupName: {type: String},
    conversationType: {type: String},
    messages: [{  type: Schema.Types.ObjectId, ref: 'Messages' }]
  },
  { 
    timestamps: true 
  }
);

export default model("Conversation", conversationSchema);