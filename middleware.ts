import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// API 라우트에 대한 CORS 설정만 유지
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  if (request.headers.get("origin")) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", request.headers.get("origin") || "*");
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
