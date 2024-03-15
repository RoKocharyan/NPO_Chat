import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  head : {
    to : {type : Number},
    from : {type : Number},
    contentType : {type : String},
    conversationId : {type : Schema.Types.ObjectId, ref : "conversation"}
  },
  body : {
    text : {type : String}
  }
})

export default model("Messages", messageSchema)