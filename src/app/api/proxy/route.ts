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
    // Pass the range header to the target server for video streaming (iOS requirement)
    const requestHeaders = new Headers();
    const range = request.headers.get('range');
    if (range) {
      requestHeaders.set('range', range);
    }

    const response = await fetch(url, { headers: requestHeaders });

    if (!response.ok && response.status !== 206) {
      return NextResponse.json({ error: 'Failed to fetch resource' }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || '';
    let finalContentType = contentType;
    if (url.endsWith('.mp4')) {
      finalContentType = 'video/mp4';
    }

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', finalContentType);
    responseHeaders.set('Cache-Control', 'public, max-age=3600');
    
    // Important for iOS Safari video playback
    responseHeaders.set('Accept-Ranges', 'bytes');
    
    const contentRange = response.headers.get('content-range');
    if (contentRange) responseHeaders.set('Content-Range', contentRange);
    
    const contentLength = response.headers.get('content-length');
    if (contentLength) responseHeaders.set('Content-Length', contentLength);

    // Stream the body instead of downloading it fully into memory
    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}