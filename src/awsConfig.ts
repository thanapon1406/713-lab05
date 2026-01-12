import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION;
if (!accessKeyId || !secretAccessKey || !endpoint || !region) {
  throw new Error(
    "Missing required environment variables for AWS S3 configuration"
  );
}

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  endpoint: endpoint,
  region: region,
  forcePathStyle: true,
});
export default s3Client;
