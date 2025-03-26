"use client";

import React from "react";
import Head from "next/head";  // ✅ next/head 추가
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const caseStudies = [
  {
    title: "쿠팡 상품 자동 등록 시스템",
    description: "Puppeteer를 활용한 자동화 사례",
    details: `
## **문제점**

쿠팡에 상품을 등록할 때, 수작업으로 입력해야 하는 번거로움과 시간이 소요됨.  
잘못된 입력이 발생하면 수정 과정이 복잡하고, 수많은 상품을 효율적으로 관리하기 어려움.

## **솔루션**

Puppeteer를 활용하여 자동으로 상품을 등록하고, 반복 작업을 최소화하는 시스템을 구축함.

## **핵심 기술**

- Puppeteer  
- Node.js  
- MongoDB  
- 쿠팡 Wing API  

## **결과**

✅ 상품 등록 속도 **80% 향상**  
✅ 수작업 오류 **90% 감소**  
✅ 등록 프로세스의 효율성 증대
    `,
  },
  {
    title: "소규모 스타트업 IT 솔루션",
    description: "최소 비용으로 SaaS 플랫폼 개발",
    details: `
## **문제점**

소규모 스타트업이 IT 솔루션을 개발하려면 높은 비용과 기술적 장벽이 존재함.

## **솔루션**

오픈소스 기반으로 **SaaS 플랫폼**을 구축하여 최소 비용으로 운영 가능하게 함.

## **핵심 기술**

- Next.js  
- Supabase  
- Stripe API  

## **결과**

✅ 개발 비용 **70% 절감**  
✅ MVP 출시 기간 **50% 단축**  
✅ 초기 고객 확보에 성공
    `,
  },
  {
    title: "CRM & 마케팅 자동화",
    description: "AI 기반 고객 관리 & 마케팅 자동화 시스템",
    details: `
## **문제점**

기업들이 고객 데이터와 마케팅 데이터를 통합 관리하지 못해 **이탈율 증가 & 비효율적 운영** 문제 발생.

## **솔루션**

콜디자이너(Call Designer) 도입:

- AI 기반 **콜 트래킹 & 고객 분석**
- **자동화된 이메일 & SMS 마케팅**
- **CRM 통합**으로 고객 세분화 & 리타겟팅 최적화

## **핵심 기술**

- AI 챗봇 & 자연어 처리 (NLP)
- CRM API 연동 (HubSpot, Salesforce)
- Twilio API (콜 & SMS 자동화)

## **결과**

✅ 고객 재방문율 **+35% 증가**  
✅ 이메일 & SMS 응답률 **+40% 상승**  
✅ 내부 마케팅 비용 **30% 절감**
    `,
  },
];

export default function CasesPage() {
  return (
    <>
      {/* ✅ next/head를 사용하여 <title> 추가 */}
      <Head>
        <title>실전 사례 모음 | devminelab</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            📖 실전 사례
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            다양한 비즈니스 사례를 통해 성공적인 전략을 배워보세요.
            실제 구현된 솔루션들의 성과와 기술 스택을 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* Cases Grid Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseItem, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
              >
                <CardHeader className="space-y-2 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {caseItem.title}
                    </CardTitle>
                  </div>
                  <p className="text-muted-foreground text-sm">{caseItem.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="prose prose-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    <ReactMarkdown>{caseItem.details}</ReactMarkdown>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        성공 사례
                      </span>
                    </div>
                    <Link
                      href={`/case/${index}`}
                      className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary/80 transition-colors group/link"
                    >
                      자세히 보기
                      <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-background to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">더 많은 사례가 필요하신가요?</h2>
          <p className="text-muted-foreground mb-8">
            devminelab과 함께 성공적인 비즈니스 솔루션을 만들어보세요.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            문의하기
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
