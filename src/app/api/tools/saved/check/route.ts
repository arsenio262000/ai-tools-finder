import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserSavedTools } from '@/lib/clerk';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ savedTools: {} });
    }

    // Get all saved tools for the user
    const savedToolIds = await getUserSavedTools(userId);
    console.log('Saved tool IDs:', savedToolIds); // Debug log

    // Create a map of toolId -> true for saved tools
    const savedToolsMap = savedToolIds.reduce((acc, toolId) => {
      acc[toolId] = true;
      return acc;
    }, {} as Record<string, boolean>);

    console.log('Saved tools map:', savedToolsMap); // Debug log

    return NextResponse.json({ savedTools: savedToolsMap });
  } catch (error) {
    console.error('Check error:', error);
    return NextResponse.json(
      { error: 'Failed to check saved tools', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 