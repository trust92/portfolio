// api/image/[image]/route.ts
// API route to serve individual images

import { promises as fs } from 'fs';
import path from 'path';
import { IMAGE_DIR } from '@/lib/config';

export async function GET(request: Request, context: { params: Promise<{ image: string }> }) {
  try {
    const params = await context.params;
    const { image } = params;
    if (!image || typeof image !== 'string') throw new Error('Invalid image parameter');
    const filePath = path.join(IMAGE_DIR, image);
    const imageBuffer = await fs.readFile(filePath);
    const contentType = image.endsWith('.png') ? 'image/png' : image.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Image API error:', error);
    return Response.json({ error: 'Failed to load image' }, { status: 404 });
  }
}