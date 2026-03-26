import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  // Validate that the URL is from your backend server
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com/';
  if (!url.startsWith('https://admin.vvworx.com/') && !url.startsWith(API_URL)) {
    return NextResponse.json({ error: 'Unauthorized URL' }, { status: 403 });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch resource' }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || '';

    // 🔥 Fix only for video files
    let finalContentType = contentType;

    if (url.endsWith('.mp4')) {
      finalContentType = 'video/mp4';
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': finalContentType, // ✅ fixed
        'Cache-Control': 'public, max-age=3600',
        'Accept-Ranges': 'bytes', // ✅ important for iOS
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}