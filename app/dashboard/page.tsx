"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LogOut, Loader2, FileText, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  interface User {
    email: string;
  }

  const [user, ] = useState<User | null>(null);
  const [loading, ] = useState(false);
  const [workbooks, ] = useState<{ id: string; title: string }[]>([]);
  const router = useRouter();

  // 로그아웃 처리
  async function handleLogout() {
    try {
      console.log("🔄 로그아웃 시도 중...");
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        console.error("❌ 로그아웃 실패:", error);
        return;
      }
  
      console.log("✅ 로그아웃 완료");
  
      // ✅ 로그아웃 후 세션 상태 강제 확인
      setTimeout(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("✅ 로그아웃 상태 확인됨 → /auth로 이동");
          router.replace("/auth");
        } else {
          console.warn("🚨 로그아웃 후에도 세션이 남아있음:", user);
        }
      }, 500); // Supabase가 쿠키를 정리할 시간을 주기 위해 500ms 지연
    } catch (error) {
      console.error("❌ 로그아웃 중 예외 발생:", error);
    }
  }
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      {/* 대시보드 제목 */}
      <h1 className="text-3xl font-bold text-center flex items-center justify-center">
        <BarChart className="h-8 w-8 mr-2 text-primary" />
        대시보드
      </h1>
      <p className="text-center text-gray-500 mt-2">환영합니다, {user?.email} 님! 🎉</p>

      {/* 빠른 액션 버튼 */}
      <div className="flex justify-center mt-6 space-x-4">
        <Button className="flex items-center bg-primary text-white">
          <PlusCircle className="mr-2" />
          새 워크북 만들기
        </Button>
        <Button variant="outline" className="flex items-center" onClick={handleLogout}>
          <LogOut className="mr-2" />
          로그아웃
        </Button>
      </div>

      {/* 최근 워크북 리스트 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>📂 최근 작업한 워크북</CardTitle>
        </CardHeader>
        <CardContent>
          {workbooks.length > 0 ? (
            <ul className="space-y-3">
              {workbooks.map((workbook) => (
                <li key={workbook.id} className="bg-gray-100 p-4 rounded hover:bg-gray-200 transition">
                  <FileText className="inline-block h-5 w-5 text-primary mr-2" />
                  <a href={`/workbook/${workbook.id}`} className="text-lg font-semibold text-blue-600">
                    {workbook.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">최근 작업한 워크북이 없습니다.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
