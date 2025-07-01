import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import express, { Request, Response } from "express";

import { connectToDatabase, UrlModel } from "@repo/db";
import { router } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("URL Shortener backend is running!");
});

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
})();

// async function bootstrap() {
//   try {
//     await connectToDatabase();
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", err);
//     process.exit(1);
//   }
// }

// bootstrap(); // manual call
