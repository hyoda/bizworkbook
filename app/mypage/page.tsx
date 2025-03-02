"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { User } from "@/types";

export default function MyPage() {

  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<{ workbook_id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ 인증 상태 감지 & 유저 정보 가져오기
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.replace("/auth"); // 로그인 안 된 경우 인증 페이지로 이동
          return;
        }
        setUser(user);
      } catch (error) {
        console.error("🚨 유저 정보 불러오기 실패:", error);
        router.replace("/auth");
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // 로그인 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener.subscription?.unsubscribe();
  }, [router]);

  // ✅ 즐겨찾기한 워크북 가져오기
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch("/api/favorites");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("🚨 즐겨찾기 불러오기 실패:", error);
        setMessage("즐겨찾기를 불러오는 중 오류가 발생했습니다.");
      }
    }

    fetchFavorites();
  }, []);

  // ✅ 로그아웃 처리
  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/auth"); // 로그아웃 후 로그인 페이지로 이동
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">👤 마이페이지</h1>

      {user && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>사용자 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.id}</p>
            <Button onClick={handleLogout} className="bg-red-500 w-full mt-4">
              로그아웃
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ⭐ 즐겨찾기한 워크북 리스트 */}
      <Card>
        <CardHeader>
          <CardTitle>⭐ 즐겨찾기한 워크북</CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <ul className="list-none space-y-3">
              {favorites.map((fav) => (
                <li key={fav.workbook_id} className="bg-gray-100 p-4 rounded shadow-sm hover:bg-gray-200 transition">
                  <Link href={`/workbook/${fav.workbook_id}`} className="text-lg font-semibold text-blue-600">
                    {fav.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">즐겨찾기한 워크북이 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
