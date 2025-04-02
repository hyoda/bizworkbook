"use client";

import "./globals.css";
import { ErrorProvider } from "@/context/ErrorContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar"; // ✅ Navbar 컴포넌트 추가
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="ko">
      <Head>
        <title>devminelab | AI 기반 비즈니스 워크북</title>
        <meta name="description" content="devminelab은 AI를 활용한 실전 비즈니스 솔루션을 제공합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="min-h-screen bg-background text-foreground">
        <ErrorProvider>
          <AuthProvider>
            <Navbar /> {/* ✅ 네비게이션 포함 */}
            <main className="flex-1">{children}</main>
          </AuthProvider>
        </ErrorProvider>
        <footer className="border-t border-border/40 bg-background py-6 text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} devminelab. 모든 권리 보유.</p>
        </footer>
      </body>
    </html>
  );
}
