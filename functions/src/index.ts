import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// This function responds to HTTP requests
export const helloWorld = onRequest((req, res) => {
  logger.info("Hello from Firebase!", { structuredData: true });
  res.send("Hello from Firebase!");
});
