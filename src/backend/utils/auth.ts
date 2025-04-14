import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const checkAuth = async () => {
  const { userId } = auth();
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  return userId;
};

export const getUserId = () => {
  const { userId } = auth();
  return userId;
};

export const getUser = () => {
  const { userId, user } = auth();
  return { userId, user };
}; 