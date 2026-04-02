import mongoose, { Document, Schema } from "mongoose";

export interface IBlacklist extends Document {
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const blacklistSchema = new Schema<IBlacklist>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Blacklist = mongoose.model<IBlacklist>("Blacklist", blacklistSchema);

export default Blacklist;
