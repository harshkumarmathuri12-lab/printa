import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const client = process.env.AWS_ACCESS_KEY_ID
  ? new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
  : null;

export async function createUploadUrl({ folder = 'uploads', contentType }) {
  const extension = contentType?.split('/')[1] || 'bin';
  const key = `${folder}/${randomUUID()}.${extension}`;

  if (!client) {
    return {
      key,
      uploadUrl: `mock-s3://${key}`,
      publicUrl: `/mock-assets/${key}`
    };
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType
  });

  return {
    key,
    uploadUrl: await getSignedUrl(client, command, { expiresIn: 60 * 5 }),
    publicUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  };
}
