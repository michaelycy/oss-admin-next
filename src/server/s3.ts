import { S3Client } from '@aws-sdk/client-s3';

/** 存储桶名称 */
export const bucket = process.env.COS_BUCKET!;
/** 区域 ap-shanghai */
export const region = process.env.COS_REGION!;
/** 腾讯云对象存储 endpoint */
export const cosEndpoint = `https://cos.${region}.myqcloud.com`;

/** 腾讯云对象存储读取配置 */
const COS_SECRET_ID = process.env.COS_SECRET_ID!;
const COS_SECRET_KEY = process.env.COS_SECRET_KEY!;

/**
 * Shared S3 Client instance for COS
 * Use singleton pattern to reuse connection
 */
export const s3Client = new S3Client({
  endpoint: cosEndpoint,
  region,
  credentials: {
    accessKeyId: COS_SECRET_ID,
    secretAccessKey: COS_SECRET_KEY,
  },
});
