import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { z } from 'zod';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { withAppProcedure, router } from '../trpc';
import { db } from '@/server/db/db';
import { files } from '@/server/db/schema';
import { v4 as uuid } from 'uuid';
import { and, asc, desc, eq, isNull, sql } from 'drizzle-orm';
import { filesOrderByFieldColumnsSchema } from '@/server/db/validate-schema';
import { TRPCError } from '@trpc/server';

/** 文件表中支持排序的字段  */
const filesOrderByFieldColumns = z
  .object({
    // 支持排序的字段
    field: filesOrderByFieldColumnsSchema.keyof(),
    order: z.enum(['asc', 'desc']),
  })
  .optional();

export type IFilesOrderByFieldColumns = z.infer<typeof filesOrderByFieldColumns>;

export const fileOpenRoutes = router({
  /** 创建预签名 URL */
  createPresignedUrl: withAppProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
        size: z.number(),
        appId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const isoString = new Date().toISOString();
      const dateStr = isoString.split('T')[0];
      const { filename, contentType, size } = input;

      const app = await db.query.apps.findFirst({
        where: (app, { eq }) => eq(app.id, input.appId),
        // 将关联的存储桶信息也查询出来
        with: {
          storage: true,
        },
      });

      if (!app || !app.storage) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }

      if (app.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const storageConf = app.storage.configuration;
      const params: PutObjectCommandInput = {
        Bucket: storageConf.bucket,
        Key: `${dateStr}/${filename.replaceAll(' ', '_')}`,
        ContentType: contentType,
        ContentLength: size,
      };

      const s2Client = new S3Client({
        endpoint: storageConf.apiEndpoint,
        region: storageConf.region,
        credentials: {
          accessKeyId: storageConf.accessKeyId,
          secretAccessKey: storageConf.secretAccessKey,
        },
      });

      const command = new PutObjectCommand(params);
      const url = await getSignedUrl(s2Client, command, { expiresIn: 60 });

      return { url, method: 'PUT' as const };
    }),

  /** 保存文件 */
  saveFile: withAppProcedure
    .input(
      z.object({
        name: z.string(),
        path: z.string(),
        type: z.string(),
        appId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;

      const url = new URL(input.path);

      const photo = await db
        .insert(files)
        .values({
          ...input,
          id: uuid(),
          path: url.pathname,
          url: url.toString(),
          userId: user.id,
          contentType: input.type,
        })
        .returning();

      return photo[0];
    }),

  /** 列出用户所有文件 */
  listFiles: withAppProcedure
    .input(z.object({ appId: z.string() }))
    .query(async ({ ctx, input }) => {
      const photos = await db.query.files.findMany({
        where: (files, { eq }) => and(eq(files.userId, ctx.user.id), eq(files.appId, input.appId)),
        orderBy: [desc(files.createdAt)],
      });

      return photos;
    }),

  infiniteListFiles: withAppProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.string(),
            id: z.string(),
          })
          .optional(),
        limit: z.number().default(10),
        orderBy: filesOrderByFieldColumns,
        appId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { cursor, orderBy = { field: 'createdAt', order: 'desc' } } = input;

      const deletedFilter = isNull(files.deletedAt);
      const userFilter = eq(files.userId, ctx.user.id);
      const appFilter = eq(files.appId, input.appId);

      const photosData = db
        .select()
        .from(files)
        .where(
          cursor
            ? and(
                sql`("files"."created_at","files"."id") < (${new Date(
                  cursor.createdAt,
                ).toISOString()},${cursor.id})`,
                deletedFilter,
                userFilter,
                appFilter,
              )
            : and(deletedFilter, userFilter, appFilter),
        )
        // .orderBy(desc(files.createdAt))
        .limit(input.limit);

      photosData.orderBy(
        orderBy.order === 'desc' ? desc(files[orderBy.field]) : asc(files[orderBy.field]),
      );

      const photos = await photosData;

      return {
        items: photos,
        nextCursor:
          photos.length > 0
            ? { createdAt: photos[photos.length - 1].createdAt!, id: photos[photos.length - 1].id }
            : undefined,
        hasNextPage: photos.length >= input.limit,
      };
    }),

  /** 删除文件 根据 ID 移除（逻辑删除） */
  deleteFileById: withAppProcedure
    .input(z.object({ id: z.string(), appId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const photo = await db
        .update(files)
        .set({ deletedAt: new Date() })
        .where(
          and(eq(files.id, input.id), eq(files.userId, ctx.user.id), eq(files.appId, input.appId)),
        )
        .returning();

      return photo[0];
    }),
});
