"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, Users } from "lucide-react";

const principles = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />, 
    title: "실행 중심",
    description: "아이디어를 실행으로 옮기는 구체적인 로드맵과 도구를 제공합니다."
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />, 
    title: "효율적인 자동화",
    description: "불필요한 반복 업무를 제거하고, 생산성을 극대화하는 자동화 시스템을 제공합니다."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />, 
    title: "검증된 마케팅 전략",
    description: "데이터 기반의 마케팅 퍼널과 AI 추천 시스템을 활용하여 비즈니스 성장을 돕습니다."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />, 
    title: "커뮤니티 & 피드백",
    description: "지속적인 학습과 피드백을 통해 더욱 강력한 솔루션을 만들어갑니다."
  }
];


export default function Philosophy() {

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-6 max-w-5xl mx-auto">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">📖 우리의 철학 & 가치</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          우리는 단순한 이론이 아닌, 실제로 검증된 자동화와 실행 중심의 접근을 통해
          비즈니스 성공을 돕습니다.
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {principles.map((principle, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-2 w-fit rounded-md bg-primary/10 mb-3">
                {principle.icon}
              </div>
              <CardTitle>{principle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{principle.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold">🚀 더 알아보고 싶으신가요?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          우리의 철학을 직접 경험해보세요.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/workbook">무료 체험하기</Link>
        </Button>
      </section>
    </main>
  );
}
