"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "Next.js + Supabase로 OAuth 인증 시스템 구축하기",
    excerpt: "Google, GitHub, KakaoTalk 등 다양한 OAuth 로그인 구현 사례와 Supabase 기반 RBAC 인가 적용법 정리",
    slug: "oauth-auth-system"
  },
  {
    id: "2",
    title: "NestJS에서 중복 사용자 생성 문제 해결하기",
    excerpt: "MongoDB와 NestJS를 활용한 데이터 정합성 체크 및 사용자 검증 로직 최적화",
    slug: "nestjs-user-validation"
  },
  {
    id: "3",
    title: "Bull Queue를 활용한 대량 이메일 발송 및 로깅 자동화",
    excerpt: "NestJS와 Bull Queue를 활용해 대량 이메일을 안정적으로 처리하는 배치 시스템 구축",
    slug: "bull-queue-email"
  },
  {
    id: "4",
    title: "Puppeteer로 쿠팡 Wing 상품 자동 등록하기",
    excerpt: "로그인 자동화, 상품 입력, 가격 조정, 이미지 추가 등 Puppeteer 기반 자동화 기법 정리",
    slug: "puppeteer-coupang"
  },
  {
    id: "5",
    title: "Next.js 14 + RevenueCat + Stripe을 활용한 구독 서비스 구축",
    excerpt: "Next.js 기반으로 웹 & 앱에서 구독 결제 시스템을 구현하고, Stripe와 RevenueCat을 활용한 관리법 소개",
    slug: "subscription-service"
  },
  {
    id: "6",
    title: "Octoparse 크롤링 데이터를 MongoDB에 저장하는 방법",
    excerpt: "쇼핑몰 데이터를 크롤링하여 JSON 형식으로 변환하고 MongoDB에 저장하는 자동화 파이프라인 구축",
    slug: "octoparse-mongodb"
  },
  {
    id: "7",
    title: "GPT API를 활용한 AI 블로그 포스팅 자동화",
    excerpt: "OpenAI API를 활용해 키워드 입력만으로 블로그 글을 생성하는 자동화 시스템 개발",
    slug: "ai-blog-posting"
  },
  {
    id: "8",
    title: "Samsung Knox를 활용한 모바일 기기 보안 정책 적용하기",
    excerpt: "Samsung Knox API를 이용해 원격 보안 정책을 적용하고, 기업용 MDM 솔루션을 구축하는 방법",
    slug: "samsung-knox-security"
  },
  {
    id: "9",
    title: "AI 기반 MBTI 테스트 및 성향 분석 시스템 개발기",
    excerpt: "AI를 활용하여 MBTI 유형을 분석하고, 개인 맞춤형 추천 시스템을 개발한 과정 공유",
    slug: "ai-mbti-analysis"
  },
  {
    id: "10",
    title: "UPS API 연동하여 배송 트래킹 자동화하기",
    excerpt: "UPS API를 활용해 실시간 송장 발급 및 배송 추적을 자동화한 사례 분석",
    slug: "ups-tracking"
  },
  {
    id: "11",
    title: "devminelab의 기술 투자 모델: IT 솔루션으로 성장 극대화",
    excerpt: "IT 솔루션을 기반으로 스타트업 및 소규모 사업과 협력하는 기술 투자 모델 소개",
    slug: "tech-investment-model"
  },
  {
    id: "12",
    title: "AI 챗봇을 활용한 자동 이메일 응답 시스템 만들기",
    excerpt: "Gmail API와 OpenAI API를 활용해 이메일을 자동 분석하고 적절한 답변을 생성하는 방법",
    slug: "ai-email-response"
  },
  {
    id: "13",
    title: "Next.js + MongoDB를 활용한 유튜브 큐레이션 플랫폼 개발기",
    excerpt: "'CurateTube' 프로젝트를 통해 유튜브 영상을 관리하고 공유하는 웹 서비스 개발 과정 공유",
    slug: "youtube-curation"
  },
  {
    id: "14",
    title: "Notion & Slack 연동 AI 일정 리마인더 시스템 개발",
    excerpt: "AI 기반으로 업무 일정을 분석하고, Notion 및 Slack과 연동하여 리마인드 기능을 구현한 사례",
    slug: "ai-reminder-system"
  },
  {
    id: "15",
    title: "OpenAI API를 활용한 감정 분석 시스템 구축하기",
    excerpt: "채팅 데이터의 감정을 분석하고 시각화하여 사용자 감정 패턴을 분석하는 AI 시스템 개발",
    slug: "emotion-analysis"
  },
  {
    id: "16",
    title: "AI를 활용한 개인 맞춤형 다이어트 관리 솔루션 개발기",
    excerpt: "체중 감량 및 건강 관리를 위한 AI 기반 트래킹 시스템 구축 및 데이터 분석 적용",
    slug: "ai-diet-solution"
  },
  {
    id: "17",
    title: "NFT를 활용한 중고 거래 플랫폼: 의미 있는 물건의 재탄생",
    excerpt: "단순 거래를 넘어, 중고 물건의 히스토리를 NFT로 기록하여 새로운 가치를 부여하는 방법",
    slug: "nft-marketplace"
  },
  {
    id: "18",
    title: "입춘 맞이 긍정 메시지 콘텐츠 제작 과정",
    excerpt: "긍정적인 메시지를 전달하는 AI 기반 콘텐츠 기획 및 클래식 테마 영상 제작 사례",
    slug: "positive-message"
  },
  {
    id: "19",
    title: "OpenAI 기반 AI 음성 비서 개발기",
    excerpt: "React Native + Expo를 활용하여 AI 음성을 학습하고, 가족의 목소리를 활용한 TTS/STT 시스템 구축",
    slug: "ai-voice-assistant"
  },
  {
    id: "20",
    title: "ChatGPT 기반 여행 플래너 개발: AI가 추천하는 완벽한 여행 일정",
    excerpt: "AI가 여행 스타일과 예산을 분석하여 맞춤형 여행 일정을 생성하는 시스템 개발기",
    slug: "ai-travel-planner"
  }
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          📚 기술 블로그
        </h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed">
          개발 경험과 기술적 인사이트를 공유합니다.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost">
                  <Link href={`/blog/${post.slug}`}>
                    자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
