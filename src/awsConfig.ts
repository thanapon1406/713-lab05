import { S3Client } from "@aws-sdk/client-s3";
import { env } from "prisma/config";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: env("S3_ACCESS_KEY_ID"),
    secretAccessKey: env("S3_SECRET_ACCESS_KEY"),
  },
  endpoint: env("S3_ENDPOINT"),
  region: env("S3_REGION"),
  forcePathStyle: true,
});
export default s3Client;
