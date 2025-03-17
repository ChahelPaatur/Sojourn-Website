import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Define subscriber interface
interface Subscriber {
  email: string;
  timestamp: string;
  source: string;
  status: 'active' | 'unsubscribed';
}

/**
 * NOTE: For a production environment, you should:
 * 1. Replace this in-memory storage with a proper database solution (MongoDB, PostgreSQL, etc.)
 * 2. Implement proper authentication using NextAuth.js or similar
 * 3. Add rate limiting to prevent abuse
 * 4. Add CSRF protection
 */
let subscribers: Subscriber[] = [];

/**
 * Basic authentication check
 * In production, use a proper auth middleware or NextAuth.js
 */
function isAuthenticated(request: Request): boolean {
  // In a real app, implement proper session-based or token-based auth
  // For now, we'll just check if the request is coming from our admin page
  const headersList = headers();
  const referer = headersList.get('referer') || '';
  return referer.includes('/admin');
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// GET endpoint to fetch subscribers
export async function GET() {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store, must-revalidate',
      'Content-Type': 'application/json',
    };

    return NextResponse.json({ subscribers, count: subscribers.length }, { headers });
  } catch (error) {
    console.error('Error in GET /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint to add new subscriber
export async function POST(request: Request) {
  try {
    const { email, source = 'website' } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === email);
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Re-subscribe if previously unsubscribed
        existingSubscriber.status = 'active';
        existingSubscriber.timestamp = new Date().toISOString();
        return NextResponse.json({ message: 'Re-subscribed successfully' });
      }
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Add new subscriber
    const newSubscriber: Subscriber = {
      email,
      timestamp: new Date().toISOString(),
      source,
      status: 'active'
    };

    subscribers.push(newSubscriber);
    console.log(`New subscriber added: ${email}`);
    console.log(`Total subscribers: ${subscribers.length}`);

    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { headers }
    );
  } catch (error) {
    console.error('Error in POST /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// OPTIONS endpoint for CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Note: For production, replace in-memory storage with a database
// Example with MongoDB:
/*
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    return client.db('sojourn').collection('subscribers');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const collection = await connectDB();
    const subscribers = await collection.find({}).toArray();
    return NextResponse.json({ subscribers, count: subscribers.length });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
*/ 