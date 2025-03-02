"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function Blog() {
  interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    created_at: string;
  }

  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from("blog_posts").select("id, title, excerpt, created_at").order("created_at", { ascending: false });
      if (!error) {
        setPosts(data || []);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">📖 실행 중심의 비즈니스 블로그</h1>
      <p className="text-lg text-muted-foreground text-center mb-10">
        최신 마케팅 트렌드, 자동화 전략, 그리고 실행 가능한 비즈니스 인사이트를 만나보세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <p className="text-sm text-gray-500 mt-2">{format(new Date(post.created_at), "yyyy년 MM월 dd일")}</p>
                <Button asChild variant="ghost" className="mt-4">
                  <Link href={`/blog/${post.id}`}>더 보기 →</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-2">아직 게시물이 없습니다.</p>
        )}
      </div>
    </main>
  );
}
