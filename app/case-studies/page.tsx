"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { useState } from "react";

const caseStudies = [
  {
    id: "1",
    title: "NestJS 사용자 인증 및 데이터 동기화",
    description: "email + enabled 조합 기반 사용자 검증 및 rmsUser 데이터 활용",
    slug: "nestjs-auth-sync",
    category: "Backend"
  },
  {
    id: "2",
    title: "MongoDB 배치 처리 및 이메일 자동화",
    description: "Bull Queue를 활용한 이메일 전송 배치 처리 및 로그 관리",
    slug: "mongodb-batch-email",
    category: "Backend"
  },
  {
    id: "3",
    title: "Next.js OAuth 인증 시스템",
    description: "Supabase 기반 다중 OAuth 인증 및 RBAC 구현",
    slug: "nextjs-oauth",
    category: "Frontend"
  },
  {
    id: "4",
    title: "웹 빌링 시스템 (RevenueCat + Stripe)",
    description: "구독 결제 처리 및 취소 API 핸들링",
    slug: "web-billing",
    category: "Payment"
  },
  {
    id: "5",
    title: "쿠팡 Wing 상품 등록 자동화",
    description: "Puppeteer를 활용한 상품 등록 프로세스 자동화",
    slug: "coupang-auto",
    category: "Automation"
  },
  {
    id: "6",
    title: "Octoparse 크롤링 & MongoDB 저장",
    description: "쇼핑몰 상품 데이터 크롤링 및 저장 시스템",
    slug: "octoparse-crawling",
    category: "Data"
  },
  {
    id: "7",
    title: "CurateTube - 유튜브 큐레이션",
    description: "유튜브 플레이리스트 관리 및 메모 플랫폼",
    slug: "curatetube",
    category: "Platform"
  },
  {
    id: "8",
    title: "Shoestory - 맞춤 신발 각인",
    description: "사용자 맞춤 신발 각인 및 판매 플랫폼",
    slug: "shoestory",
    category: "E-commerce"
  },
  {
    id: "9",
    title: "Dead Memo Society - AI 메모 앱",
    description: "AI와 연계된 메모링 서비스 및 Obsidian 연동",
    slug: "dead-memo",
    category: "AI"
  },
  {
    id: "10",
    title: "BizWorkbook - 실전 비즈니스 워크북",
    description: "Next.js 14+ 기반 AI 추천 기능 포함 비즈니스 가이드",
    slug: "bizworkbook",
    category: "Platform"
  },
  {
    id: "11",
    title: "MBTI 기반 성향 분석 시스템",
    description: "Next.js + MongoDB 기반 MBTI 테스트 및 AI 추천 시스템",
    slug: "mbti-analysis",
    category: "AI"
  },
  {
    id: "12",
    title: "UPS API 물류 시스템 자동화",
    description: "UPS 배송 API를 활용한 송장 생성 및 실시간 배송 추적",
    slug: "ups-automation",
    category: "Integration"
  },
  {
    id: "13",
    title: "Samsung Knox MDM 솔루션",
    description: "모바일 기기 관리 및 보안 정책 자동 적용 시스템",
    slug: "samsung-knox",
    category: "Security"
  },
  {
    id: "14",
    title: "AI MBTI 심리 분석 챗봇",
    description: "GPT API를 활용한 대화형 성향 분석 및 피드백 시스템",
    slug: "ai-mbti-chatbot",
    category: "AI"
  },
  {
    id: "15",
    title: "Adaptive Learning 추천 시스템",
    description: "학습 패턴 분석 기반 맞춤형 강의 추천 플랫폼",
    slug: "adaptive-learning",
    category: "Education"
  },
  {
    id: "16",
    title: "중소기업용 POS 시스템",
    description: "바코드 스캔 및 판매 데이터 분석 대시보드",
    slug: "pos-system",
    category: "Retail"
  },
  {
    id: "17",
    title: "AI 채팅 감정 분석 시스템",
    description: "실시간 감정 분석 및 트렌드 예측 플랫폼",
    slug: "chat-emotion-analysis",
    category: "AI"
  },
  {
    id: "18",
    title: "AI 리뷰 요약 시스템",
    description: "쇼핑몰 리뷰 자동 요약 및 추천 시스템",
    slug: "review-summary",
    category: "AI"
  },
  {
    id: "19",
    title: "AI 주식 데이터 분석",
    description: "시계열 예측 기반 투자 추천 시스템",
    slug: "stock-analysis",
    category: "Finance"
  },
  {
    id: "20",
    title: "AI 음성 비서",
    description: "TTS/STT 기반 음성 비서 서비스",
    slug: "ai-voice-assistant",
    category: "AI"
  },
  {
    id: "21",
    title: "AI 자동 블로그 포스팅 시스템",
    description: "GPT API를 활용한 자동 포스팅 및 SEO 최적화 시스템",
    slug: "ai-blog-posting",
    category: "AI"
  },
  {
    id: "22",
    title: "SaaS AI 자동화 서비스 MVP",
    description: "Next.js + Supabase + Stripe 기반 맞춤형 자동화 플랫폼",
    slug: "saas-ai-automation",
    category: "Platform"
  },
  {
    id: "23",
    title: "AI 이메일 자동 응답 시스템",
    description: "Gmail API + OpenAI API 기반 이메일 자동 응답 및 분석",
    slug: "ai-email-response",
    category: "AI"
  },
  {
    id: "24",
    title: "ChatGPT 여행 플래너",
    description: "맞춤형 여행 일정 추천 및 Google Maps API 연동",
    slug: "ai-travel-planner",
    category: "AI"
  },
  {
    id: "25",
    title: "AI 프로젝트 관리 보조 시스템",
    description: "Slack, Notion 연동 기반 업무 자동화 및 생산성 향상 도구",
    slug: "ai-project-management",
    category: "Automation"
  },
  {
    id: "26",
    title: "자동화 크롤링 서비스",
    description: "Puppeteer + MongoDB 기반 웹 데이터 자동 수집 시스템",
    slug: "automated-crawling",
    category: "Data"
  },
  {
    id: "27",
    title: "AI 리마인더 시스템",
    description: "Obsidian + GPT API 기반 개인 생산성 향상 도구",
    slug: "ai-reminder",
    category: "AI"
  }
];

// 중복 제거를 위해 기존 caseStudies 배열에서 일부 항목 제거
const filteredCaseStudies = caseStudies.filter((study, index, self) =>
  index === self.findIndex((s) => (
    s.title === study.title || 
    s.description === study.description
  ))
);

const categories = Array.from(new Set(filteredCaseStudies.map(study => study.category)));

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredStudies = selectedCategory
    ? filteredCaseStudies.filter(study => study.category === selectedCategory)
    : filteredCaseStudies;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          📊 프로젝트 포트폴리오
        </h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed">
          다양한 기술 스택과 도메인에서의 프로젝트 개발 경험을 공유합니다.
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex items-center gap-4 mb-8">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">카테고리</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            전체
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Case Study List */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center">✅ 주요 프로젝트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {filteredStudies.map((study) => (
            <Card key={study.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{study.title}</CardTitle>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                    {study.category}
                  </span>
                </div>
                <CardDescription>{study.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost">
                  <Link href={`/case-studies/${study.slug}`}>
                    자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Improvements Section */}
      <section className="max-w-5xl mx-auto py-16 px-6 bg-muted/50">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">🚀 기술적 개선</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>CI/CD & DevOps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• GitHub Actions 워크플로우 개선</li>
                <li>• Jenkins 시간 설정 최적화</li>
                <li>• Next.js 프로젝트 구조 분석</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>UI/UX 개선</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• SVG를 React 컴포넌트로 변환</li>
                <li>• Next.js SSR + CSS-in-JS 연구</li>
                <li>• Radix Themes 적용</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
