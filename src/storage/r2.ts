import { S3mini } from "s3mini";

type R2UploadEnv = {
  R2_ENDPOINT?: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
  R2_PUBLIC_URL?: string;
};

export async function uploadToR2(file: File, key: string, env?: R2UploadEnv): Promise<string> {
  const endpoint = env?.R2_ENDPOINT ?? process.env.R2_ENDPOINT;
  const accessKeyId = env?.R2_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = env?.R2_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const publicUrl = (env?.R2_PUBLIC_URL ?? process.env.R2_PUBLIC_URL)?.replace(/\/$/, "");

  if (!endpoint || !accessKeyId || !secretAccessKey || !publicUrl) {
    throw new Error("R2 configuration is incomplete");
  }

  const s3 = new S3mini({
    accessKeyId,
    secretAccessKey,
    endpoint,
    region: "auto",
  });

  await s3.putAnyObject(key, file, file.type || undefined);

  return `${publicUrl}/${key}`;
}
