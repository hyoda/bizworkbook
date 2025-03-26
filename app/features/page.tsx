"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BarChart2, Users, Shield, Calendar, FileText, ArrowRight } from "lucide-react";


const features = [
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "단계별 비즈니스 로드맵",
    description: "아이디어부터 실행까지 한눈에 확인하세요.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "실전 사례 아카이브",
    description: "성공과 실패 사례를 분석하여 인사이트를 얻으세요.",
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-primary" />,
    title: "데이터 기반 인사이트",
    description: "AI 분석을 통해 최적의 전략을 추천받으세요.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "워크북 시스템",
    description: "직접 기록하고 실행하는 인터랙티브 워크북 제공.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "보안 및 권한 관리",
    description: "데이터 보호와 역할 기반 권한 설정을 지원합니다.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "커뮤니티 & 피드백",
    description: "다른 창업자와 경험을 공유하고 성장하세요.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-20 text-center bg-primary text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          📌 DevmineLab 기능 소개
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
          비즈니스 관리에 필요한 모든 도구를 한 곳에서 제공합니다.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12">
            비즈니스 성장을 위한 모든 도구
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-2 w-fit rounded-md bg-primary/10 mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>직관적인 사용자 인터페이스</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>실시간 업데이트</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>맞춤형 설정 옵션</span>
                    </li>
                  </ul>
                </CardContent>
                {/* <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                  <Link href="/features">더 보기 →</Link>
                  </Button>
                </CardFooter> */}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
