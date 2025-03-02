"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, Github } from "lucide-react";
import { GoogleIcon as Google } from "@/components/GoogleIcon";

export default function AuthPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | "kakao" | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ 인증 상태 변경 감지 (로그아웃 시 자동 이동)
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 인증 상태 변경 감지:", event, session);
      if (event === "SIGNED_OUT") {
        console.log("✅ 로그아웃 감지 → /auth로 이동");
        router.push("/auth");
      } else if (event === "SIGNED_IN") {
        console.log("✅ 로그인 감지 → /dashboard로 이동");
        router.push("/dashboard");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  // ✅ 회원가입 핸들러
  async function handleSignUp() {
    setLoading(true);
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("📩 올바른 이메일을 입력하세요.");
      setLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setMessage("🔑 비밀번호는 최소 6자 이상이어야 합니다.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    
    if (error) {
      setMessage(`❌ 회원가입 실패: ${error.message}`);
    } else {
      setMessage("✅ 가입 완료! 이메일을 확인하세요.");
    }

    setTimeout(() => setMessage(""), 5000);
  }

  // ✅ 로그인 핸들러
  async function handleLogin() {
    setLoading(true);
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!email || !password) {
      setMessage("⚠️ 이메일과 비밀번호를 입력하세요.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log("🔐 로그인 시도 결과:", data, error);

    if (error) {
      setMessage("❌ 로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.");
      setLoading(false);
      return;
    }

    // ✅ 세션을 강제 갱신하여 빠르게 반영
    await supabase.auth.refreshSession();

    setMessage("✅ 로그인 성공! 🎉");
    setTimeout(() => {
      router.push("/dashboard"); // 🔄 `replace()` → `push()`로 변경하여 자연스러운 이동
    }, 1000);
  }

  // ✅ OAuth 로그인 핸들러 (구글, 깃허브, 카카오)
  async function handleOAuthLogin(provider: "google" | "github" | "kakao") {
    setOauthLoading(provider);

    const { error } = await supabase.auth.signInWithOAuth({ provider });

    setOauthLoading(null);
    if (error) {
      setMessage("❌ OAuth 로그인 실패: " + error.message);
    } else {
      setTimeout(() => {
        router.push("/dashboard"); // ✅ OAuth 로그인 후 보장된 리디렉션 추가
      }, 1000);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🔐 회원가입 & 로그인</h1>

      {/* 📌 이메일 로그인 & 회원가입 */}
      <div className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-500" />
          <Input
            ref={emailRef}
            type="email"
            placeholder="이메일"
            className="pl-10 border p-2 rounded w-full focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500" />
          <Input
            ref={passwordRef}
            type="password"
            placeholder="비밀번호 (6자 이상)"
            className="pl-10 border p-2 rounded w-full focus:ring focus:ring-blue-500"
          />
        </div>

        <Button
          onClick={handleSignUp}
          className="bg-blue-600 text-white p-2 rounded w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "회원가입"}
        </Button>
        <Button
          onClick={handleLogin}
          className="bg-gray-700 text-white p-2 rounded w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "로그인"}
        </Button>
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-center text-gray-600">또는 소셜 로그인</p>
      </div>

      {/* 📌 OAuth 로그인 */}
      <div className="mt-4 flex flex-col space-y-3">
        <Button
          onClick={() => handleOAuthLogin("google")}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
          disabled={oauthLoading === "google"}
        >
          {oauthLoading === "google" ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Google className="mr-2" />}
          Google 로그인
        </Button>

        <Button
          onClick={() => handleOAuthLogin("github")}
          className="bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center"
          disabled={oauthLoading === "github"}
        >
          {oauthLoading === "github" ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Github className="mr-2" />}
          GitHub 로그인
        </Button>
      </div>

      {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
    </div>
  );
}
