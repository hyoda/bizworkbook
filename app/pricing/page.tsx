"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricingPlans = [
  {
    title: "무료 플랜",
    price: "₩0 /월",
    features: [
      "기본 워크북 제공",
      "커뮤니티 참여",
      "기본 분석 기능",
      "1개 프로젝트 제한",
    ],
    cta: "무료로 시작하기",
    link: "/workbook",
  },
  {
    title: "프리미엄 플랜",
    price: "₩9,900 /월",
    features: [
      "무제한 워크북 생성",
      "AI 기반 데이터 분석",
      "고급 보안 기능",
      "3개 프로젝트 제한",
    ],
    cta: "프리미엄 구독하기",
    link: "/workbook",
  },
  {
    title: "비즈니스 플랜",
    price: "₩29,900 /월",
    features: [
      "기업 전용 계정",
      "팀 협업 기능",
      "우선 고객 지원",
      "무제한 프로젝트",
    ],
    cta: "비즈니스 신청하기",
    link: "/workbook",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-20 text-center bg-primary text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          💰 가격 정책
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
          DevmineLab의 다양한 플랜을 확인하고, 비즈니스에 맞는 옵션을 선택하세요.
        </p>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border border-border">
            <CardHeader className="text-center">
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription className="text-2xl font-semibold">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-full mt-6">
                <Link href={plan.link}>{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
