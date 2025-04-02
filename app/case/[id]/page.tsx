"use client";

import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";

const caseStudies = [
  {
    title: "쿠팡 상품 자동 등록 시스템",
    description: "Puppeteer를 활용한 자동화 사례",
    videoUrl: "https://youtu.be/PXGjLKk73n4",
    details: `
## **프로젝트 개요**

쿠팡 상품 자동 등록 시스템은 Puppeteer를 활용하여 반복적인 상품 등록 작업을 자동화하는 프로젝트입니다.  
이를 통해 수작업의 번거로움을 줄이고, 상품 등록 속도를 대폭 향상시켰습니다.

## **주요 기능**

- **자동 로그인**: 쿠팡 Wing에 자동 로그인하여 상품 등록 작업을 수행합니다.
- **상품 등록 자동화**: 상품 정보(제목, 가격, 옵션, 이미지 등)를 자동으로 입력하여 등록합니다.
- **오류 감지 및 수정**: 잘못된 입력을 방지하고, 사전 검증을 통해 오류를 최소화합니다.
- **등록 속도 최적화**: 다수의 상품을 동시에 등록할 수 있도록 최적화된 프로세스를 제공합니다.

## **활용 가이드**

### 1. 프로젝트 실행 방법

#### **환경 설정**
\`\`\`bash
# 프로젝트 클론
git clone https://github.com/your-repo/coupang-auto-listing.git
cd coupang-auto-listing

# 의존성 설치
npm install
\`\`\`

#### **환경 변수 설정**
\`dotenv\`를 사용하여 필요한 환경 변수를 설정합니다.

\`\`\`env
COUPANG_ID=your_id
COUPANG_PASSWORD=your_password
\`\`\`

#### **프로그램 실행**
\`\`\`bash
npm start
\`\`\`

### 2. 주요 기술 스택

- **Puppeteer**: 웹 자동화를 위한 크롤링 및 스크래핑
- **Node.js**: 백엔드 서비스 및 작업 스케줄링
- **MongoDB**: 상품 데이터 저장 및 관리
- **쿠팡 Wing API**: 상품 등록 및 관리

## **프로젝트 결과 및 성과**

✅ 상품 등록 속도 **80% 향상**  
✅ 수작업 오류 **90% 감소**  
✅ 등록 프로세스의 효율성 증대

## **마무리**

본 프로젝트를 활용하면 쿠팡에 다량의 상품을 손쉽게 등록하고, 반복 작업을 최소화할 수 있습니다.  
지속적인 개선을 통해 더욱 효율적인 상품 관리가 가능하도록 업데이트할 예정입니다.
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

  if (!caseItem) {
    return (
      <main className="max-w-3xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          ❌ 해당 사례를 찾을 수 없습니다.
        </h1>
        <p className="text-muted-foreground mt-2">
          잘못된 접근이거나 사례가 존재하지 않습니다.
        </p>
        <Button asChild className="mt-6">
          <Link href="/cases">🔙 사례 목록으로 돌아가기</Link>
        </Button>
      </main>
    );
  }

  const components: Components = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <div className="my-4 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{caseItem.title}</h1>
        <p className="text-xl text-muted-foreground">{caseItem.description}</p>
      </div>

      {/* Video Section */}
      {caseItem.videoUrl && (
        <div className="mb-12">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
            {/* <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${caseItem.videoUrl.split('v=')[1]}`}
              title="Project Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/PXGjLKk73n4?si=vG5GNjDJWAd2xPXO"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
            <ReactMarkdown components={components}>
              {caseItem.details}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Button asChild variant="outline" className="group">
          <Link href="/cases">
            <span className="inline-block transition-transform group-hover:-translate-x-1 mr-2">
              ←
            </span>
            사례 목록으로 돌아가기
          </Link>
        </Button>
      </div>
    </main>
  );
}
