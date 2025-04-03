"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowWeWork() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          ⚡ 우리의 실행 프로세스 & 자동화 방법론
        </h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed">
          단순한 아이디어가 아니라, 실행 가능한 시스템을 구축합니다. <br/> 
          자동화, 데이터 기반 의사결정, 그리고 지속적인 개선을 통해 성장하세요.
        </p>
      </section>

      {/* 실행 프로세스 */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center">📌 실행 프로세스</h2>
        <p className="mt-6 text-lg text-center text-muted-foreground">
          실행 가능하도록 정리된 프로세스를 통해 비즈니스를 빠르게 구축하고 최적화합니다.
        </p>
        <ul className="pl-8 text-lg space-y-2 text-muted-foreground mt-4">
          <li>✅ 아이디어 검증 & 고객 피드백 수집</li>
          <li>✅ 마케팅 퍼널 구축 & 트래픽 확보</li>
          <li>✅ 자동화 시스템을 통한 운영 최적화</li>
          <li>✅ 성과 분석 및 지속적인 개선</li>
        </ul>
      </section>

      {/* 자동화 사례 */}
      <section className="bg-muted py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center tracking-tight mb-10">🚀 자동화 성공 사례</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "이커머스 마케팅 자동화",
                description: "쿠팡 & 네이버 스마트스토어 광고 자동화 사례",
              },
              {
                title: "고객 관리 시스템",
                description: "CRM & 이메일 자동화 워크플로우 구축",
              },
              {
                title: "B2B 영업 자동화",
                description: "LinkedIn & 이메일 퍼널을 활용한 자동 리드 생성",
              },
            ].map((caseItem, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{caseItem.title}</h3>
                <p className="mt-2 text-muted-foreground">{caseItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - 워크북 활용 */}
      <section className="text-center py-20 bg-primary text-primary-foreground">
        <h2 className="text-3xl font-bold">📂 자동화를 직접 실행해보세요!</h2>
        <p className="mt-4 text-lg">워크북을 통해 실행 프로세스를 직접 적용해보세요.</p>
        <Button asChild size="lg" className="mt-6 bg-white text-primary shadow-md hover:bg-gray-200">
          <Link href="/workbooks">워크북 보기</Link>
        </Button>
      </section>
    </main>
  );
}
