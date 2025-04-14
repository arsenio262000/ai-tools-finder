import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserSavedTools } from '@/lib/clerk';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ count: 0 });
    }

    const savedTools = await getUserSavedTools(userId);
    return NextResponse.json({ count: savedTools.length });
  } catch (error) {
    console.error('Error getting saved tools count:', error);
    return NextResponse.json(
      { error: 'Failed to get saved tools count' },
      { status: 500 }
    );
  }
} 