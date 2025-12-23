import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { z } from 'zod';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { protectedProcedure, router } from '../trpc';
import { db } from '@/server/db/db';
import { files } from '@/server/db/schema';
import { v4 as uuid } from 'uuid';
import { desc, eq } from 'drizzle-orm';

/** 存储桶名称 */
const bucket = '';
/** 区域 */
const region = '';

/** 腾讯云对象存储读取配置 */
const COS_SECRET_ID = '';
const COS_SECRET_KEY = '';

export const fileRoutes = router({
  /** 创建预签名 URL */
  createPresignedUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
        size: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const isoString = new Date().toISOString();
      const dateStr = isoString.split('T')[0];
      const { filename, contentType, size } = input;

      const params: PutObjectCommandInput = {
        Bucket: bucket,
        Key: `${dateStr}/${filename.replaceAll(' ', '_')}`,
        ContentType: contentType,
        ContentLength: size,
      };

      const s2Client = new S3Client({
        endpoint: `https://cos.${region}.myqcloud.com`,
        region,
        credentials: {
          accessKeyId: COS_SECRET_ID,
          secretAccessKey: COS_SECRET_KEY,
        },
      });

      const command = new PutObjectCommand(params);
      const url = await getSignedUrl(s2Client, command, { expiresIn: 60 });

      return { url, method: 'PUT' as const };
    }),

  saveFile: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        path: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx;

      const url = new URL(input.path);

      const photo = await db
        .insert(files)
        .values({
          ...input,
          id: uuid(),
          path: url.pathname,
          url: url.toString(),
          userId: session.user.id,
          contentType: input.type,
        })
        .returning();

      return photo[0];
    }),

  /** 列出用户所有文件 */
  listFiles: protectedProcedure
    // .input(
    //   // z.object({
    //   //   userId: z.string(),
    //   // })
    // )
    .query(async () => {
      // const { userId } = input;

      // const photos = await db.select().from(files).where(eq(files.userId, userId));
      const photos = await db.query.files.findMany({
        // where: eq(files.userId, userId),
        orderBy: [desc(files.createdAt)],
      });

      return photos;
    }),
});
