import { S3Client, PutObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {

  const s3Configuration: S3ClientConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_AWS_REGION,
  };

  const s3 = new S3Client(s3Configuration);
  
  const { filename, fileType} = req.body;

  const command = new PutObjectCommand({Bucket: process.env.BUCKET_NAME, Key: filename});

  const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 }); 
 
  res.status(201).json({url})
  } else {
    throw new Error("Did not manage to connect")
  }
}