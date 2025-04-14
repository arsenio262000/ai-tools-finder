import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserSavedTools, updateUserSavedTools } from '@/lib/clerk';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { toolId } = body;

    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }

    // Get current saved tools
    const savedTools = await getUserSavedTools(userId);
    console.log('Current saved tools:', savedTools); // Debug log

    // Check if tool is already saved
    const isToolSaved = savedTools.includes(toolId);
    console.log('Is tool saved:', isToolSaved); // Debug log

    // Update the saved tools list
    const updatedSavedTools = isToolSaved
      ? savedTools.filter(id => id !== toolId)
      : [...savedTools, toolId];

    console.log('Updated saved tools:', updatedSavedTools); // Debug log

    // Update user metadata
    await updateUserSavedTools(userId, updatedSavedTools);

    return NextResponse.json({
      success: true,
      isSaved: !isToolSaved,
      message: isToolSaved ? 'Tool removed from saved items' : 'Tool saved successfully'
    });
  } catch (error) {
    console.error('Save error:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to save tool', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 