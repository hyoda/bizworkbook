"use client";

import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    title: "CRM & 마케팅 자동화 (콜디자이너)",
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

export default function CaseDetailPage() {
  const { id } = useParams();
  const caseIndex = parseInt(id as string, 10);
  const caseItem = caseStudies[caseIndex];

  // 존재하지 않는 ID 예외 처리
  if (!caseItem) {
    return (
      <main className="max-w-3xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">❌ 해당 사례를 찾을 수 없습니다.</h1>
        <p className="text-muted-foreground mt-2">잘못된 접근이거나 사례가 존재하지 않습니다.</p>
        <Button asChild className="mt-6">
          <Link href="/cases">🔙 사례 목록으로 돌아가기</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">{caseItem.title}</CardTitle>
          <p className="text-muted-foreground">{caseItem.description}</p>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg text-gray-800 leading-relaxed">
            <ReactMarkdown>{caseItem.details}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/cases">🔙 사례 목록으로 돌아가기</Link>
        </Button>
      </div>
    </main>
  );
}
