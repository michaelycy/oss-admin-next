import { db } from '@/server/db/db';
import { GetObjectCommand, GetObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(_Req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const imageId = param.id;

  // 根据ID 去数据库中将对应的path 查出来
  const file = await db.query.files.findFirst({
    where: (files, { eq }) => eq(files.id, imageId),
    with: {
      app: {
        with: {
          storage: true,
        },
      },
    },
  });

  if (!file || !file.app || !file.app.storage) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  if (!file || !file.contentType.startsWith('image/')) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const storageConf = file.app.storage.configuration;
  const commonInput: GetObjectCommandInput = {
    Bucket: storageConf.bucket,
    Key: file.path,
  };

  try {
    const common = new GetObjectCommand(commonInput);
    const s3Client = new S3Client({
      endpoint: storageConf.apiEndpoint,
      region: storageConf.region,
      credentials: {
        accessKeyId: storageConf.accessKeyId,
        secretAccessKey: storageConf.secretAccessKey,
      },
    });
    const res = await s3Client.send(common);

    if (!res.Body) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // 将 S3 返回的 Body 转为 Buffer
    const buffer = await res.Body.transformToByteArray();
    const sharpImage = sharp(buffer);

    // Resize and convert to WebP
    sharpImage.resize({ width: 250, height: 250, fit: 'cover' }).webp({ quality: 80 });

    const imageBuffer = await sharpImage.toBuffer();
    const body = new Uint8Array(imageBuffer);

    return new NextResponse(body, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
