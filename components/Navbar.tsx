"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Menu, X, User as UserICon, LogIn, Briefcase, BookOpen, ClipboardList, FileText, Home, Layout, Lightbulb } from "lucide-react";
import { User } from "@/types";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-md dark:bg-gray-900">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-6">
        {/* 로고 */}
        <div className="flex items-center gap-2 mr-4">
          <Briefcase className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold tracking-tight text-primary">
            BizWorkbook
          </Link>
        </div>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" /> 홈
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1">
              <Lightbulb className="h-4 w-4" /> 철학
            </Link>
            <Link href="/how-we-work" className="hover:text-primary transition-colors flex items-center gap-1">
              <ClipboardList className="h-4 w-4" /> 방법론
            </Link>
            <Link href="/case-studies" className="hover:text-primary transition-colors flex items-center gap-1">
              <FileText className="h-4 w-4" /> 케이스 스터디
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> 블로그
            </Link>
            <Link href="/workbook" className="hover:text-primary transition-colors flex items-center gap-1">
              <Layout className="h-4 w-4" /> 워크북
            </Link>
          </div>

          {/* 로그인 / 마이페이지 */}
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/mypage" className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-transform hover:scale-105">
                <UserICon className="h-4 w-4" />
                마이페이지
              </Link>
            ) : (
              <Link href="/auth" className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-transform hover:scale-105">
                <LogIn className="h-4 w-4" />
                로그인
              </Link>
            )}
          </div>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <div className="flex md:hidden flex-1 justify-end">
          <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="sr-only">메뉴 열기</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 transform ${
          mobileMenuOpen ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">메뉴</h2>
            <button onClick={closeMobileMenu} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
              <Home className="h-4 w-4" /> 홈
            </Link>
            <Link href="/about" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
              <Lightbulb className="h-4 w-4" /> 철학
            </Link>
            <Link href="/how-we-work" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
              <ClipboardList className="h-4 w-4" /> 방법론
            </Link>
            <Link href="/case-studies" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
              <FileText className="h-4 w-4" /> 케이스 스터디
            </Link>
            <Link href="/blog" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
              <BookOpen className="h-4 w-4" /> 블로그
            </Link>
            <Link href="/workbook" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
              <Layout className="h-4 w-4" /> 워크북
            </Link>
            {user ? (
              <Link href="/mypage" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
                <UserICon className="h-4 w-4" /> 마이페이지
              </Link>
            ) : (
              <Link href="/auth" className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center gap-1" onClick={closeMobileMenu}>
                <LogIn className="h-4 w-4" /> 로그인
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
