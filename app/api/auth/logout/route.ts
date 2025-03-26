import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "로그아웃 성공" },
    { status: 200 }
  );

  // 세션 쿠키 삭제
  response.cookies.delete("session");

  return response;
} 