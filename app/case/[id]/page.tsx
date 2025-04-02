interface CaseStudyProps {
  params: {
    id: string
  }
}

const caseStudies = {
  '1': {
    title: 'SaaS 플랫폼 구축 사례',
    overview: [
      '소규모 스타트업의 IT 솔루션 개발 비용 절감 사례',
      '오픈소스 기반 SaaS 플랫폼 구축'
    ],
    challenges: [
      '높은 개발 비용',
      '기술적 장벽',
      '빠른 시장 진입 필요성'
    ],
    techStack: {
      'Next.js': [
        'App Router 활용',
        'Server Components로 성능 최적화',
        'TypeScript 기반 개발'
      ],
      'Supabase': [
        'PostgreSQL 데이터베이스',
        'Row Level Security 적용',
        'Auth 시스템 활용',
        '실시간 구독 기능'
      ],
      'Stripe': [
        '구독 결제 시스템',
        '다양한 결제 수단 지원',
        '자동 청구서 발행'
      ]
    },
    results: {
      '개발 비용 70% 절감': [
        '서버리스 아키텍처 활용',
        '오픈소스 컴포넌트 재사용',
        '자동화된 CI/CD 파이프라인'
      ],
      'MVP 출시 기간 50% 단축': [
        '검증된 기술 스택 활용',
        '컴포넌트 기반 개발',
        '신속한 프로토타이핑'
      ],
      '초기 고객 확보': [
        '프리미엄 요금제 전환율 15%',
        'NPS 점수 45',
        '월간 활성 사용자 1,000명 달성'
      ]
    },
    lessons: [
      '오픈소스 활용이 비용 절감의 핵심',
      '서버리스 아키텍처로 운영 부담 감소',
      '빠른 시장 검증이 성공의 열쇠'
    ],
    futurePlans: [
      '기능 고도화',
      '엔터프라이즈 고객 유치',
      '글로벌 시장 진출'
    ]
  }
}

export default function CaseStudy({ params }: CaseStudyProps) {
  const caseData = caseStudies[params.id as keyof typeof caseStudies]

  if (!caseData) {
    return <div>Case study not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-6">Case Study {params.id}: {caseData.title}</h1>
        
        <h2 className="text-3xl font-bold mb-4">📌 개요</h2>
        <ul className="list-disc list-inside mb-4">
          {caseData.overview.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold mb-4">🎯 도전 과제</h2>
        <ul className="list-disc list-inside mb-4">
          {caseData.challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold mb-4">💡 해결 방안</h2>
        <h3 className="text-2xl font-bold mb-3">기술 스택 선정</h3>
        <ol className="list-decimal list-inside mb-4">
          {Object.entries(caseData.techStack).map(([tech, features], index) => (
            <li key={index} className="mb-4">
              <strong>{tech}</strong>
              <ul className="list-disc list-inside ml-6 mt-2">
                {features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <h2 className="text-3xl font-bold mb-4">📊 결과</h2>
        <ul className="list-disc list-inside mb-4">
          {Object.entries(caseData.results).map(([result, details], index) => (
            <li key={index} className="mb-4">
              {result}
              <ul className="list-disc list-inside ml-6 mt-2">
                {details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold mb-4">🔑 핵심 교훈</h2>
        <ol className="list-decimal list-inside mb-4">
          {caseData.lessons.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ol>

        <h2 className="text-3xl font-bold mb-4">🔄 향후 계획</h2>
        <ul className="list-disc list-inside mb-4">
          {caseData.futurePlans.map((plan, index) => (
            <li key={index}>{plan}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
