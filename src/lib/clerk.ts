import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function getUserSavedTools(userId: string): Promise<string[]> {
  try {
    const user = await clerk.users.getUser(userId);
    const savedTools = (user.privateMetadata?.savedTools as string[]) || [];
    return savedTools;
  } catch (error) {
    console.error('Error getting saved tools:', error);
    return [];
  }
}

export async function updateUserSavedTools(userId: string, savedTools: string[]) {
  try {
    const user = await clerk.users.getUser(userId);
    const currentMetadata = user.privateMetadata || {};
    
    await clerk.users.updateUser(userId, {
      privateMetadata: {
        ...currentMetadata,
        savedTools
      }
    });
  } catch (error) {
    console.error('Error updating saved tools:', error);
    throw error;
  }
} 