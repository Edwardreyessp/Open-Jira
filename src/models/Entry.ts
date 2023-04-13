import { Entry } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "Invalid status",
    },
    default: "pending",
  },
});

export interface IEntry extends Entry {}

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
