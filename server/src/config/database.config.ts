import mongoose from "mongoose";

export const connectToDatabase = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error disconnecting from MongoDB:", err);
    throw err;
  }
};
