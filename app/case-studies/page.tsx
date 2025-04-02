"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter, Code2, Database, Server, Cpu } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  slug: string;
  category: string;
  image?: string;
  videoUrl?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "nestjs-auth-sync",
    title: "NestJS 기반 사용자 인증 및 데이터 동기화 시스템 구현",
    description: "NestJS와 Passport/JWT를 활용한 안정적인 사용자 인증 시스템 구축 및 RMS와의 데이터 동기화 방법",
    date: "2024-03-07",
    readTime: "10분",
    tags: ["NestJS", "Authentication", "JWT", "TypeScript"],
    slug: "nestjs-auth-sync",
    category: "Backend"
  },
  {
    id: "mongodb-batch-email",
    title: "MongoDB 배치 처리 및 Bull Queue 기반 이메일 자동화 시스템 구현",
    description: "대규모 데이터 처리와 안정적인 이메일 전송을 위한 배치 처리 시스템 구축 사례",
    date: "2024-03-08",
    readTime: "12분",
    tags: ["NestJS", "MongoDB", "Bull Queue", "Email Automation", "TypeScript"],
    slug: "mongodb-batch-email",
    category: "Backend"
  },
  {
    id: "nextjs-oauth",
    title: "Next.js OAuth 인증 시스템",
    description: "Supabase 기반 다중 OAuth 인증 및 RBAC 구현",
    date: "2024-03-06",
    readTime: "8분",
    tags: ["Next.js", "Supabase", "OAuth", "RBAC", "TypeScript"],
    slug: "nextjs-oauth",
    category: "Frontend"
  },
  {
    id: "web-billing",
    title: "웹 빌링 시스템 (RevenueCat + Stripe)",
    description: "구독 결제 처리 및 취소 API 핸들링",
    date: "2024-03-05",
    readTime: "15분",
    tags: ["RevenueCat", "Stripe", "Payment", "API", "TypeScript"],
    slug: "web-billing",
    category: "Payment"
  },
  {
    id: "coupang-auto",
    title: "쿠팡 Wing 상품 등록 자동화",
    description: "Puppeteer를 활용한 상품 등록 프로세스 자동화",
    date: "2024-03-04",
    readTime: "10분",
    tags: ["Puppeteer", "Node.js", "Automation", "TypeScript"],
    slug: "coupang-auto",
    category: "Automation"
  },
  {
    id: "octoparse-crawling",
    title: "Octoparse 크롤링 & MongoDB 저장",
    description: "쇼핑몰 상품 데이터 크롤링 및 저장 시스템",
    date: "2024-03-03",
    readTime: "8분",
    tags: ["Octoparse", "MongoDB", "Crawling", "Data"],
    slug: "octoparse-crawling",
    category: "Data"
  },
  {
    id: "curatetube",
    title: "CurateTube - 유튜브 큐레이션",
    description: "유튜브 플레이리스트 관리 및 메모 플랫폼",
    date: "2024-03-02",
    readTime: "12분",
    tags: ["Next.js", "YouTube API", "MongoDB", "TypeScript"],
    slug: "curatetube",
    category: "Platform"
  },
  {
    id: "shoestory",
    title: "Shoestory - 맞춤 신발 각인",
    description: "사용자 맞춤 신발 각인 및 판매 플랫폼",
    date: "2024-03-01",
    readTime: "10분",
    tags: ["Next.js", "E-commerce", "Customization", "TypeScript"],
    slug: "shoestory",
    category: "E-commerce"
  },
  {
    id: "dead-memo",
    title: "Dead Memo Society - AI 메모 앱",
    description: "AI와 연계된 메모링 서비스 및 Obsidian 연동",
    date: "2024-02-29",
    readTime: "15분",
    tags: ["Next.js", "OpenAI", "Obsidian", "TypeScript"],
    slug: "dead-memo",
    category: "AI"
  },
  {
    id: "bizworkbook",
    title: "BizWorkbook - 실전 비즈니스 워크북",
    description: "Next.js 14+ 기반 AI 추천 기능 포함 비즈니스 가이드",
    date: "2024-02-28",
    readTime: "20분",
    tags: ["Next.js", "OpenAI", "MongoDB", "TypeScript"],
    slug: "bizworkbook",
    category: "Platform"
  },
  {
    id: "mbti-analysis",
    title: "MBTI 기반 성향 분석 시스템",
    description: "Next.js + MongoDB 기반 MBTI 테스트 및 AI 추천 시스템",
    date: "2024-02-27",
    readTime: "12분",
    tags: ["Next.js", "MongoDB", "AI", "MBTI", "TypeScript"],
    slug: "mbti-analysis",
    category: "AI"
  },
  {
    id: "ups-automation",
    title: "UPS API 물류 시스템 자동화",
    description: "UPS 배송 API를 활용한 송장 생성 및 실시간 배송 추적",
    date: "2024-02-26",
    readTime: "10분",
    tags: ["UPS API", "Node.js", "Automation", "TypeScript"],
    slug: "ups-automation",
    category: "Integration"
  },
  {
    id: "samsung-knox",
    title: "Samsung Knox MDM 솔루션",
    description: "모바일 기기 관리 및 보안 정책 자동 적용 시스템",
    date: "2024-02-25",
    readTime: "15분",
    tags: ["Knox API", "Security", "MDM", "TypeScript"],
    slug: "samsung-knox",
    category: "Security"
  },
  {
    id: "ai-mbti-chatbot",
    title: "AI MBTI 심리 분석 챗봇",
    description: "GPT API를 활용한 대화형 성향 분석 및 피드백 시스템",
    date: "2024-02-24",
    readTime: "10분",
    tags: ["OpenAI", "ChatGPT", "MBTI", "TypeScript"],
    slug: "ai-mbti-chatbot",
    category: "AI"
  },
  {
    id: "adaptive-learning",
    title: "Adaptive Learning 추천 시스템",
    description: "학습 패턴 분석 기반 맞춤형 강의 추천 플랫폼",
    date: "2024-02-23",
    readTime: "12분",
    tags: ["Machine Learning", "Next.js", "MongoDB", "TypeScript"],
    slug: "adaptive-learning",
    category: "Education"
  },
  {
    id: "pos-system",
    title: "중소기업용 POS 시스템",
    description: "바코드 스캔 및 판매 데이터 분석 대시보드",
    date: "2024-02-22",
    readTime: "15분",
    tags: ["Electron", "Node.js", "SQLite", "TypeScript"],
    slug: "pos-system",
    category: "Retail"
  },
  {
    id: "chat-emotion-analysis",
    title: "AI 채팅 감정 분석 시스템",
    description: "실시간 감정 분석 및 트렌드 예측 플랫폼",
    date: "2024-02-21",
    readTime: "10분",
    tags: ["NLP", "Machine Learning", "Real-time", "TypeScript"],
    slug: "chat-emotion-analysis",
    category: "AI"
  },
  {
    id: "review-summary",
    title: "AI 리뷰 요약 시스템",
    description: "쇼핑몰 리뷰 자동 요약 및 추천 시스템",
    date: "2024-02-20",
    readTime: "8분",
    tags: ["OpenAI", "NLP", "MongoDB", "TypeScript"],
    slug: "review-summary",
    category: "AI"
  },
  {
    id: "stock-analysis",
    title: "AI 주식 데이터 분석",
    description: "시계열 예측 기반 투자 추천 시스템",
    date: "2024-02-19",
    readTime: "15분",
    tags: ["Machine Learning", "Time Series", "Python", "TypeScript"],
    slug: "stock-analysis",
    category: "Finance"
  },
  {
    id: "ai-voice-assistant",
    title: "AI 음성 비서",
    description: "TTS/STT 기반 음성 비서 서비스",
    date: "2024-02-18",
    readTime: "12분",
    tags: ["TTS", "STT", "OpenAI", "TypeScript"],
    slug: "ai-voice-assistant",
    category: "AI"
  },
  {
    id: "ai-blog-posting",
    title: "AI 자동 블로그 포스팅 시스템",
    description: "GPT API를 활용한 자동 포스팅 및 SEO 최적화 시스템",
    date: "2024-02-17",
    readTime: "10분",
    tags: ["OpenAI", "SEO", "Automation", "TypeScript"],
    slug: "ai-blog-posting",
    category: "AI"
  },
  {
    id: "saas-ai-automation",
    title: "SaaS AI 자동화 서비스 MVP",
    description: "Next.js + Supabase + Stripe 기반 맞춤형 자동화 플랫폼",
    date: "2024-02-16",
    readTime: "20분",
    tags: ["Next.js", "Supabase", "Stripe", "TypeScript"],
    slug: "saas-ai-automation",
    category: "Platform"
  },
  {
    id: "ai-email-response",
    title: "AI 이메일 자동 응답 시스템",
    description: "Gmail API + OpenAI API 기반 이메일 자동 응답 및 분석",
    date: "2024-02-15",
    readTime: "10분",
    tags: ["Gmail API", "OpenAI", "Automation", "TypeScript"],
    slug: "ai-email-response",
    category: "AI"
  },
  {
    id: "ai-travel-planner",
    title: "ChatGPT 여행 플래너",
    description: "맞춤형 여행 일정 추천 및 Google Maps API 연동",
    date: "2024-02-14",
    readTime: "12분",
    tags: ["OpenAI", "Google Maps", "Next.js", "TypeScript"],
    slug: "ai-travel-planner",
    category: "AI"
  },
  {
    id: "ai-project-management",
    title: "AI 프로젝트 관리 보조 시스템",
    description: "Slack, Notion 연동 기반 업무 자동화 및 생산성 향상 도구",
    date: "2024-02-13",
    readTime: "15분",
    tags: ["Slack API", "Notion API", "OpenAI", "TypeScript"],
    slug: "ai-project-management",
    category: "Automation"
  },
  {
    id: "automated-crawling",
    title: "자동화 크롤링 서비스",
    description: "Puppeteer + MongoDB 기반 웹 데이터 자동 수집 시스템",
    date: "2024-02-12",
    readTime: "10분",
    tags: ["Puppeteer", "MongoDB", "Automation", "TypeScript"],
    slug: "automated-crawling",
    category: "Data"
  },
  {
    id: "ai-reminder",
    title: "AI 리마인더 시스템",
    description: "Obsidian + GPT API 기반 개인 생산성 향상 도구",
    date: "2024-02-11",
    readTime: "8분",
    tags: ["Obsidian", "OpenAI", "Automation", "TypeScript"],
    slug: "ai-reminder",
    category: "AI"
  }
];

const featuredCases = [
  {
    id: "coupang-auto",
    title: "쿠팡 Wing 상품 등록 자동화",
    description: "Puppeteer를 활용한 상품 등록 프로세스 자동화",
    videoUrl: "PXGjLKk73n4",
    date: "2024-03-04",
    readTime: "10분",
    tags: ["Puppeteer", "Node.js", "Automation", "TypeScript"],
    slug: "coupang-auto",
    category: "Automation",
    highlights: [
      "상품 등록 시간 90% 단축",
      "인적 오류 95% 감소",
      "대량 상품 처리 가능",
      "안정적인 자동화 시스템 구축"
    ]
  },
  {
    id: "nextjs-oauth",
    title: "Next.js OAuth 인증 시스템",
    description: "Supabase 기반 다중 OAuth 인증 및 RBAC 구현",
    date: "2024-03-06",
    readTime: "8분",
    tags: ["Next.js", "Supabase", "OAuth", "RBAC", "TypeScript"],
    slug: "nextjs-oauth",
    category: "Frontend",
    highlights: [
      "다중 OAuth 제공자 통합",
      "세분화된 접근 제어",
      "보안 강화",
      "사용자 경험 개선"
    ]
  },
  {
    id: "web-billing",
    title: "웹 빌링 시스템",
    description: "RevenueCat과 Stripe를 활용한 구독 결제 시스템",
    date: "2024-03-05",
    readTime: "15분",
    tags: ["RevenueCat", "Stripe", "Payment", "API", "TypeScript"],
    slug: "web-billing",
    category: "Payment",
    highlights: [
      "자동화된 결제 처리",
      "실시간 매출 분석",
      "효율적인 구독 관리",
      "안전한 결제 처리"
    ]
  }
];

const categories = Array.from(new Set(caseStudies.map(study => study.category)));

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredStudies = selectedCategory
    ? caseStudies.filter(study => study.category === selectedCategory)
    : caseStudies;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 bg-gradient-to-b from-primary to-muted text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            프로젝트 포트폴리오
          </h1>
          <p className="mt-4 text-lg max-w-2xl leading-relaxed mx-auto">
            다양한 기술 스택과 도메인에서의 프로젝트 개발 경험을 공유합니다.
          </p>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">주요 프로젝트</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCases.map((featured) => (
            <Card key={featured.id} className="group hover:shadow-lg transition-all duration-300">
              {featured.videoUrl && (
                <div className="relative pt-[56.25%] w-full overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                    src={`https://www.youtube.com/embed/${featured.videoUrl}?si=vG5GNjDJWAd2xPXO`}
                    title={featured.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl">{featured.title}</CardTitle>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                    {featured.category}
                  </span>
                </div>
                <CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {featured.date && <span>{featured.date}</span>}
                    {featured.date && featured.readTime && <span>•</span>}
                    {featured.readTime && <span>{featured.readTime} 읽기</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{featured.description}</p>
                  {featured.tags && featured.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featured.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">주요 성과</h3>
                  <ul className="space-y-2">
                    {featured.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild variant="ghost" className="w-full mt-6 group">
                  <Link href={`/case-studies/${featured.slug}`}>
                    자세히 보기
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-5xl mx-auto py-12 px-6">
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
              onClick={() => setSelectedCategory(category || null)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Case Study List */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">주요 프로젝트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <Card key={study.id} className="group hover:shadow-lg transition-all duration-300">
              {study.image && (
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                    {study.category}
                  </span>
                </div>
                <CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {study.date && <span>{study.date}</span>}
                    {study.date && study.readTime && <span>•</span>}
                    {study.readTime && <span>{study.readTime} 읽기</span>}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{study.description}</p>
                {study.tags && study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Button asChild variant="ghost" className="group">
                  <Link href={`/case-studies/${study.slug}`}>
                    자세히 보기 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Stack Section */}
      <section className="max-w-5xl mx-auto py-16 px-6 bg-muted/50">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">기술 스택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <CardTitle>프론트엔드</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Next.js 14</li>
                <li>• React</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <CardTitle>백엔드</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• NestJS</li>
                <li>• Express</li>
                <li>• FastAPI</li>
                <li>• Django</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>데이터베이스</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• MongoDB</li>
                <li>• PostgreSQL</li>
                <li>• Redis</li>
                <li>• Elasticsearch</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <CardTitle>AI/ML</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• OpenAI API</li>
                <li>• TensorFlow</li>
                <li>• PyTorch</li>
                <li>• Scikit-learn</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
