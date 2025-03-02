import { NextResponse } from "next/server";

export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/dashboard/:path*"], // 보호할 경로 설정
};
