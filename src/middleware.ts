import { NextRequest, NextResponse } from "next/server";

// This middleware is used to handle CORS for the /api/chat endpoint
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: response.headers, status: 200 });
  }

  return response;
}

export const config = {
  matcher: "/api/chat",
};
