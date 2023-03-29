import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const startTime = Date.now()

  const s3 = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
  })
  
  const { filename, fileType} = req.body;

  const fileParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Expires: 600,
    ContentType: fileType,
  };


  const totalTime = Date.now() - startTime

  console.log("Total time to get S3 link:", totalTime)
  const url = await s3.getSignedUrlPromise("putObject", fileParams);


  res.status(201).json({url})
}