import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: 실제 인증 로직 구현
    // 여기서는 임시로 이메일과 비밀번호가 있는지만 확인
    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 로그인 성공 시 세션 쿠키 설정
    const response = NextResponse.json(
      { message: "로그인 성공" },
      { status: 200 }
    );

    response.cookies.set("session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "로그인 처리 중 오류가 발생했습니다.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 