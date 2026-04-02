import app from "./app";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/database.config";
import ENV from "./config/env.config";

const port = Number(ENV.PORT ?? 3000);

const startServer = async (): Promise<void> => {
  try {
    if (!ENV.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await connectToDatabase(ENV.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    await disconnectFromDatabase();
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

void startServer();
