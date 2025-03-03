"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
// import SearchFilter from "@/components/SearchFilter";
// import WorkbookList from "@/components/WorkbookList";
import type { Workbook } from "@/types";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, ShoppingCart, Briefcase } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Tooltip as RechartsTooltip } from "recharts";
import { User } from "@supabase/supabase-js";


const data = [
  { name: "1월", 매출: 12000000, 비용: 800000 },
  { name: "2월", 매출: 15000000, 비용: 900000 },
  { name: "3월", 매출: 18000000, 비용: 1200000 },
  { name: "4월", 매출: 22000000, 비용: 1400000 },
  { name: "5월", 매출: 26000000, 비용: 1600000 },
  { name: "6월", 매출: 27600000, 비용: 1204000 },
];

const userTypes = [
  { title: "솔로 창업자", description: "아이디어부터 실행까지!", icon: <Lightbulb className="h-10 w-10 text-primary" /> },
  { title: "스타트업 팀", description: "팀원들과 협업하세요.", icon: <Users className="h-10 w-10 text-primary" /> },
  { title: "이커머스 운영자", description: "마케팅 자동화 가능!", icon: <ShoppingCart className="h-10 w-10 text-primary" /> },
  { title: "컨설턴트 / 프리랜서", description: "고객 프로젝트 관리.", icon: <Briefcase className="h-10 w-10 text-primary" /> },
];

export default function Home() {
  const [, setUser] = useState<User | null>(null);
  const [] = useState<Workbook[]>([]);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          🚀 실전 비즈니스의 모든 것, 한 곳에서!
        </h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed">
          실전 사례와 단계별 로드맵을 통해 비즈니스 아이디어를 실행하세요.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/workbook">무료 체험하기</Link>
        </Button>
      </section> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          🚀 실행 중심의 비즈니스 자동화, BizWorkbook
        </h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed">
          단순한 이론이 아닌, 실전에서 검증된 자동화 시스템을 제공합니다. <br/> 
          단계별 로드맵과 AI 기반 도구로 비즈니스 실행을 가속화하세요.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/workbook">무료 체험하기</Link>
        </Button>
      </section>

      {/* 주요 철학 소개 */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12">📌 우리는 이렇게 일합니다</h2>
        <p className="mt-6 text-lg  text-muted-foreground">
          반복적인 업무를 최소화하고, 검증된 마케팅 퍼널과 자동화 시스템을 통해 비즈니스를 성장시킵니다.
        </p>
        <ul className="list-disc pl-6 text-lg space-y-2 text-muted-foreground mt-4">
          <li>✅ 실행 가능한 비즈니스 자동화 솔루션 제공</li>
          <li>✅ 반복적인 업무를 최소화하는 효율적인 시스템</li>
          <li>✅ 검증된 마케팅 퍼널을 활용한 성장 전략</li>
          <li>✅ 커뮤니티 기반 피드백 & 지속적인 개선</li>
        </ul>
      </section>


      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12">
            누구를 위한 서비스인가요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userTypes.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-2 w-fit rounded-md bg-primary/10 mb-3">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* 주요 기능 소개 */}
      <section className="max-w-5xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter">📌 BizWorkbook이 특별한 이유</h2>
          <ul className="list-disc pl-6 text-lg space-y-2 text-muted-foreground">
            <li>✅ 단계별 비즈니스 로드맵 제공</li>
            <li>✅ AI 기반 맞춤형 추천</li>
            <li>✅ 실전 사례 아카이브</li>
            <li>✅ 인터랙티브 워크북 시스템</li>
            <li>✅ 커뮤니티 & 피드백 공유</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <img src="/features.webp" alt="Features" className="rounded-lg shadow-lg max-h-[300px] object-cover" />
        </div>
      </section>




      {/* 실전 사례 하이라이트 */}
      <section className="bg-muted py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center tracking-tight mb-10">📖 실전 사례 하이라이트</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "쿠팡 상품 자동 등록 시스템",
                description: "Puppeteer를 활용한 자동화 사례",
              },
              {
                title: "소규모 스타트업 IT 솔루션",
                description: "최소 비용으로 SaaS 플랫폼 개발",
              },
              {
                title: "효율적인 마케팅 자동화",
                description: "광고 최적화와 고객 분석을 통한 매출 향상",
              },
            ].map((caseItem, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{caseItem.title}</CardTitle>
                  <CardDescription>{caseItem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost">
                    <Link href="/cases">더 보기 →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 인터랙티브 워크북 */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">📂 비즈니스 실행을 위한 워크북</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          당신만의 맞춤형 워크북을 생성하고 실행하세요!
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/workbook">내 워크북 만들기</Link>
        </Button>
      </section>



      {/* 사용자 리뷰 */}
      <section className="bg-muted py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center tracking-tight">💬 사용자 리뷰 & 피드백</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "김철수",
                review: "구체적인 실행 가이드 덕분에 IT 솔루션 사업을 성공적으로 시작할 수 있었습니다.",
              },
              {
                name: "박영희",
                review: "자동화 시스템 구축 가이드가 너무 유용했어요. 불필요한 반복 업무가 줄어들었어요!",
              },
            ].map((review, index) => (
              <Card key={index}>
                <CardContent>
                  <p className="text-muted-foreground">&quot;{review.review}&quot;</p>
                  <p className="mt-4 font-bold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
            데이터 기반 인사이트
          </h2>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>비즈니스 대시보드</CardTitle>
              <CardDescription>최근 6개월 매출 및 비용 추이</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => value.toLocaleString()}/>
                  <RechartsTooltip />
                  <Bar dataKey="매출" fill="rgba(29, 78, 216, 0.7)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="비용" fill="rgba(232, 144, 97, 0.7)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA - 시작하기 */}
      <section className="text-center py-20 bg-primary text-primary-foreground">
        <h2 className="text-3xl font-bold">🚀 비즈니스를 실행으로 옮길 준비가 되었나요?</h2>
        <p className="mt-4 text-lg">지금 바로 시작하세요!</p>
        <Button asChild size="lg" className="mt-6 bg-white text-primary shadow-md hover:bg-gray-200">
          <Link href="/auth">무료 체험하기</Link>
        </Button>
      </section>
    </main>
  );
}


