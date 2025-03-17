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

// GET endpoint to retrieve all subscribed emails
export async function GET(request: Request) {
  try {
    // Simple auth check for the admin endpoint
    // This is NOT production-grade security
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      count: subscribers.length,
      emails: subscribers.map(sub => sub.email),
      subscribers: subscribers
    });
  } catch (error) {
    console.error('Error retrieving subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Add basic rate limiting in production
    // You can use packages like 'express-rate-limit' with API routes
    
    const body = await request.json();
    const { email, timestamp, source } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // More thorough email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingIndex = subscribers.findIndex(sub => sub.email === email);
    if (existingIndex >= 0) {
      // Email exists but might be unsubscribed, update status to active
      if (subscribers[existingIndex].status === 'unsubscribed') {
        subscribers[existingIndex].status = 'active';
        subscribers[existingIndex].timestamp = timestamp || new Date().toISOString();
        
        return NextResponse.json(
          { success: true, message: 'Subscription reactivated!' },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 200 }
      );
    }

    /**
     * PRODUCTION DATABASE CODE:
     * Replace the in-memory storage with your database of choice
     * 
     * Example MongoDB:
     * await db.collection('subscribers').insertOne({ 
     *   email, 
     *   timestamp: timestamp || new Date().toISOString(),
     *   source: source || 'website',
     *   status: 'active'
     * });
     * 
     * Example PostgreSQL with prisma:
     * await prisma.subscriber.create({
     *   data: {
     *     email,
     *     timestamp: timestamp || new Date().toISOString(),
     *     source: source || 'website',
     *     status: 'active',
     *   }
     * });
     */
    
    // For development: use in-memory storage
    const newSubscriber: Subscriber = {
      email,
      timestamp: timestamp || new Date().toISOString(),
      source: source || 'website',
      status: 'active'
    };
    
    subscribers.push(newSubscriber);
    
    console.log('Subscriber added:', newSubscriber);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed!'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Server error processing your request' },
      { status: 500 }
    );
  }
} 