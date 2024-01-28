"use server";

import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Config: S3ClientConfig = { 
    region: process.env.AWS_BUCKET_REGION || '', 
    credentials: { 
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID || '', 
        secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY || '' 
    }
};

const s3 = new S3Client(s3Config);

export async function getSignedURL(){
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: "test-file",
    });

    const url = await getSignedUrl(s3, putObjectCommand, { expiresIn: 3600 });
    return {success: {url}}
}