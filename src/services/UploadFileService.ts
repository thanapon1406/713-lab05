import s3Client from "../awsConfig";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadFile(
  bucket: string,
  filePath: string,
  file: Express.Multer.File
): Promise<string> {
  const params = {
    Bucket: bucket,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("File uploaded successfully:", data);
    return filePath;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function getPresignedUrl(
  bucket: string,
  filePath: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: filePath,
  });
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
}
