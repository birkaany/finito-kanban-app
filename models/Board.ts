import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

const boardSchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Board || mongoose.model("Board", boardSchema);
