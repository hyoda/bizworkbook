"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User as UserICon, LogIn, Briefcase, BookOpen, ClipboardList, FileText, Home, Layout, Lightbulb } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, signOut, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold tracking-tight text-primary">
            devminelab
          </Link>
        </div>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1">
              <Lightbulb className="h-4 w-4" /> About
            </Link>
            <Link href="/how-we-work" className="hover:text-primary transition-colors flex items-center gap-1">
              <ClipboardList className="h-4 w-4" /> Services
            </Link>
            <Link href="/case-studies" className="hover:text-primary transition-colors flex items-center gap-1">
              <FileText className="h-4 w-4" /> Portfolio
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> Blog
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-1">
              <Layout className="h-4 w-4" /> Contact
            </Link>
          </div>
        </nav>

        {/* 로그인/마이페이지 버튼 - 모바일에서는 숨김 */}
        <div className="hidden md:flex items-center">
          {isLoading ? null : user ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-transform hover:scale-105"
            >
              <UserICon className="h-4 w-4" />
              로그아웃
            </button>
          ) : (
            <Link href="/auth" className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-transform hover:scale-105">
              <LogIn className="h-4 w-4" />
              로그인
            </Link>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="p-2 text-gray-600">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 - 로그인 버튼을 메뉴 하단에 추가 */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white transform ${
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-200 ease-in-out md:hidden shadow-lg`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">메뉴</h2>
            <button onClick={closeMobileMenu} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={closeMobileMenu}>
              <Home className="h-4 w-4" /> 홈
            </Link>
            <Link href="/about" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={closeMobileMenu}>
              <Lightbulb className="h-4 w-4" /> About
            </Link>
            <Link href="/how-we-work" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={closeMobileMenu}>
              <ClipboardList className="h-4 w-4" /> Services
            </Link>
            <Link href="/case-studies" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={closeMobileMenu}>
              <FileText className="h-4 w-4" /> Portfolio
            </Link>
            <Link href="/blog" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={closeMobileMenu}>
              <BookOpen className="h-4 w-4" /> Blog
            </Link>
            <Link href="/contact" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={closeMobileMenu}>
              <Layout className="h-4 w-4" /> Contact
            </Link>
          </nav>

          {/* 모바일 로그인 버튼 - 메뉴 하단에 고정 */}
          <div className="p-4 border-t">
            {isLoading ? null : user ? (
              <button
                onClick={() => {
                  signOut();
                  closeMobileMenu();
                }}
                className="flex items-center gap-2 justify-center w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
              >
                <UserICon className="h-4 w-4" />
                로그아웃
              </button>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-2 justify-center w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
                onClick={closeMobileMenu}
              >
                <LogIn className="h-4 w-4" />
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
