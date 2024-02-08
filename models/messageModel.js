import mongoose from "mongoose";
export default mongoose => {
    const message = mongoose.model(
      "message",
      mongoose.Schema(
        {
          productName: String,
          price: Number
        }
      )
    );
  
    return message;
  };