import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users, files, apps, storageConfiguration, apiKeys } from './schema';

export const insertUserSchema = createInsertSchema(users);

/** 文件查询 schema */
export const filesSchema = createSelectSchema(files);

/** 可排序的字段 files */
export const filesOrderByFieldColumnsSchema = filesSchema.pick({
  createdAt: true,
  id: true,
  deletedAt: true,
});

/** APP 应用创建 schema */
export const createAppSchema = createInsertSchema(apps, {
  name: schema =>
    schema
      .min(3, 'App name must be at least 3 character')
      .max(20, 'App name must be at most 20 characters'),
});

export const createStorageSchema = createInsertSchema(storageConfiguration, {
  name: schema =>
    schema
      .min(3, 'Storage name must be at least 3 character')
      .max(20, 'Storage name must be at most 20 characters'),
});

export const createApiKeysSchema = createInsertSchema(apiKeys);
