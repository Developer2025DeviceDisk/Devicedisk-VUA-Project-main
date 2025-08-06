import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Full name and phone are required' }, 
        { status: 400 }
      );
    }

    // Forward the request to the backend server
    const backendUrl = 'http://15.206.84.81:8000/api/contact';
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Failed to submit form' },
        { status: response.status }
      );
    }

    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}