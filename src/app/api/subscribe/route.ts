import { NextResponse } from 'next/server';

// This would typically connect to a real database
// For now, we'll store emails in memory (Note: this is temporary and will reset on server restart)
let subscribedEmails: string[] = [];

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (subscribedEmails.includes(email)) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 200 }
      );
    }

    // In a real application, you would store this in a database
    // For example:
    // await db.collection('subscribers').insertOne({ email, subscribed_at: new Date() });
    
    // For now, we'll just add to our in-memory array
    subscribedEmails.push(email);
    
    console.log('Subscribed emails:', subscribedEmails);

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
} 