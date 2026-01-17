import express, { Request, Response } from "express";
import eventRoute from "./routes/EventRoute";
import path from "path";
import cors, { CorsOptions } from "cors";
import multer from "multer";
import { uploadFile } from "./services/UploadFileService";
import dotenv from "dotenv";
import authRoute from "./routes/AuthRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const corsOptions: CorsOptions = {
  origin: ["http://localhost:5051"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use("/events", eventRoute);
app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME;
    const filePath = process.env.UPLOAD_DIR;
    if (!bucket || !filePath) {
      return res.status(500).send("Bucket name or file path not configured.");
    }

    const fileKey = await uploadFile(bucket, filePath, file);
    res.status(200).send(fileKey);
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
});

app.get("/presignedUrl", async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    if (!key || typeof key !== "string") {
      return res.status(400).send("File key is required.");
    }
    const bucket = process.env.SUPABASE_BUCKET_NAME;
    if (!bucket) {
      return res.status(500).send("Bucket or file path not configured.");
    }
    const { getPresignedUrl } = await import("./services/UploadFileService");
    const presignedUrl = await getPresignedUrl(bucket, key, 3600);
    res.status(200).json({ url: presignedUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).send("Error generating presigned URL.");
  }
});

const webApp = express();
const webPort = 5050;
webApp.use(express.static(path.join(process.cwd())));

webApp.listen(webPort, () => {
  console.log(`WebApp listening at http://localhost:${webPort}`);
});
