"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Users, Lightbulb, Rocket, Globe, Code, TrendingUp, Target } from "lucide-react";
import Link from "next/link";

// 핵심 가치 리스트
const values = [
  { icon: <BrainCircuit className="h-10 w-10 text-primary" />, title: "AI 퍼스트", description: "AI는 단순한 도구가 아닙니다. AI를 활용하는 사람이 AI에 의해 대체되지 않는 시대를 만듭니다." },
  { icon: <Lightbulb className="h-10 w-10 text-primary" />, title: "혁신적인 자영업", description: "이제 자영업은 단순한 생계가 아닌, AI와 함께 스케일업할 수 있는 강력한 사업 모델입니다." },
  { icon: <Rocket className="h-10 w-10 text-primary" />, title: "초고속 실행력", description: "AI 자동화를 통해 빠르게 아이디어를 실행하고, 시장 반응을 즉각적으로 테스트할 수 있습니다." },
  { icon: <Globe className="h-10 w-10 text-primary" />, title: "1인 기업 글로벌화", description: "AI를 활용하면 한 명이 수십 명의 역할을 수행하며, 로컬 비즈니스도 글로벌 시장으로 확장할 수 있습니다." },
  { icon: <Code className="h-10 w-10 text-primary" />, title: "AI 자동화 + 인간의 창의성", description: "자동화가 모든 것을 해결하지 않습니다. 인간의 창의성과 AI의 계산력이 결합될 때 최고의 결과가 나옵니다." },
  { icon: <TrendingUp className="h-10 w-10 text-primary" />, title: "수직 통합의 힘", description: "하드웨어, 데이터, 소프트웨어까지 모든 것을 직접 통합하는 기업이 살아남습니다." }
];

const principles = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />, 
    title: "실행 중심",
    description: "우리는 단순한 이론이 아닌, 실제로 검증된 자동화와 실행 중심의 접근을 통해 비즈니스 성공을 돕습니다."
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


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-primary to-background text-center text-white">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI 기반 자영업의 시대를 엽니다
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl mt-6">
          누구나 AI를 활용해 비즈니스를 운영하고, 글로벌 시장을 향해 확장할 수 있는 시대입니다.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-6">우리의 이야기</h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                우리는 단순한 소프트웨어를 만드는 것이 아닙니다.  
                AI를 활용해 <strong>누구나 1인 기업가가 될 수 있는 도구</strong>를 만듭니다.  
                기술이 복잡할수록, 우리는 더 단순한 솔루션을 제공합니다.
              </p>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                AI를 제대로 활용하는 순간, 당신은 더 이상 시간과 비용의 제한을 받지 않습니다.  
                <strong>DevmineLab</strong>은 <strong>AI를 통해 성장할 수 있도록, 가장 효율적인 도구를 제공합니다.</strong>
              </p>
              <Button asChild className="mt-8">
                <Link href="/contact">
                  더 알아보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[450px] rounded-lg overflow-hidden shadow-lg">
              <img src="/nomad.png" alt="AI 기반 비즈니스" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12">
            우리의 핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10">{value.icon}</div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-muted">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-12">📖 우리의 철학</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
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
          </div>
        </div>
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
    </div>
  );
}
