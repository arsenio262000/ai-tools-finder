import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserSavedTools } from '@/lib/clerk';
import { tools } from '@/data/processed-tools';

export async function GET() {
    try {
        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return NextResponse.json({ tools: [] });
        }

        const savedToolIds = await getUserSavedTools(userId);
        console.log('Saved tool IDs:', savedToolIds); // Debug log

        // Find the full tool data for each saved tool ID
        const savedTools = tools.filter(tool => savedToolIds.includes(tool.id));
        console.log('Found saved tools:', savedTools.length); // Debug log

        return NextResponse.json({
            tools: savedTools,
            count: savedTools.length
        });
    } catch (error) {
        console.error('Error getting saved tools:', error);
        return NextResponse.json(
            { error: 'Failed to get saved tools' },
            { status: 500 }
        );
    }
} 