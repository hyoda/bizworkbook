import 'dotenv/config';
import { connectToDatabase } from '../lib/mongodb';
import { Post } from '../lib/models/post';

const samplePosts = [
  {
    title: "Next.js + Supabase로 OAuth 인증 시스템 구축하기",
    content: `# Next.js + Supabase로 OAuth 인증 시스템 구축하기

OAuth 인증은 현대 웹 애플리케이션에서 필수적인 기능입니다. 이 글에서는 Next.js와 Supabase를 사용하여 안전하고 효율적인 인증 시스템을 구축하는 방법을 알아보겠습니다.

## 주요 내용
1. Supabase 프로젝트 설정
2. Next.js에서 OAuth provider 연동
3. 사용자 권한 관리와 RBAC 구현
4. 보안 고려사항과 모범 사례

자세한 내용은 본문에서 다루겠습니다...`,
    slug: "oauth-auth-system",
    excerpt: "Google, GitHub, KakaoTalk 등 다양한 OAuth 로그인 구현 사례와 Supabase 기반 RBAC 인가 적용법 정리",
    author: {
      name: "김개발",
      email: "dev@example.com"
    },
    categories: ["Next.js", "Authentication", "Security"],
    tags: ["OAuth", "Supabase", "RBAC", "TypeScript"],
    status: "published",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01")
  },
  {
    title: "NestJS에서 중복 사용자 생성 문제 해결하기",
    content: `# NestJS에서 중복 사용자 생성 문제 해결하기

MongoDB와 NestJS를 함께 사용할 때 발생할 수 있는 race condition 문제와 그 해결 방법에 대해 알아보겠습니다.

## 문제 상황
1. 동시 요청으로 인한 중복 생성
2. 트랜잭션 처리의 중요성
3. 유니크 인덱스 활용

자세한 내용은 본문에서 다루겠습니다...`,
    slug: "nestjs-user-validation",
    excerpt: "MongoDB와 NestJS를 활용한 데이터 정합성 체크 및 사용자 검증 로직 최적화",
    author: {
      name: "김개발",
      email: "dev@example.com"
    },
    categories: ["NestJS", "Database", "Backend"],
    tags: ["MongoDB", "Race Condition", "Transaction"],
    status: "published",
    createdAt: new Date("2024-03-02"),
    updatedAt: new Date("2024-03-02")
  },
  {
    title: "MongoDB 배치 처리와 Bull Queue로 구현한 대규모 이메일 자동화 시스템",
    slug: "bull-queue-email",
    author: {
      name: "서효정",
      avatar: "https://github.com/hyodakim.png"
    },
    excerpt: "대규모 이메일 발송 시스템을 구축하면서 겪은 문제와 해결 과정, 그리고 얻은 교훈을 공유합니다.",
    content: `
# MongoDB 배치 처리와 Bull Queue로 구현한 대규모 이메일 자동화 시스템

## 🎯 프로젝트 목표

우리 팀은 수만 명의 사용자에게 개인화된 뉴스레터를 발송하는 시스템을 구축해야 했습니다. 주요 요구사항은 다음과 같았습니다:

- 대규모 사용자 데이터의 효율적인 처리
- 안정적인 이메일 발송과 실패 복구
- 상세한 발송 현황 모니터링
- 시스템 확장성 확보

## 🤔 직면한 문제들

### 1. 대규모 데이터 처리 문제
초기에는 단순히 forEach로 사용자 데이터를 순회하며 이메일을 발송했습니다. 하지만 이 방식은 다음과 같은 문제를 일으켰습니다:

- 메모리 사용량 급증
- 데이터베이스 연결 부하 증가
- 처리 시간 지연

### 2. 이메일 발송 실패 처리
네트워크 문제나 이메일 서비스 제한으로 인한 발송 실패가 빈번했고, 다음과 같은 이슈가 발생했습니다:

- 실패한 이메일의 재시도 처리 부재
- 실패 원인 추적 어려움
- 부분적 성공/실패 시 데이터 일관성 문제

### 3. 모니터링 부재
대규모 발송 작업의 진행 상황을 파악하기 어려웠습니다:

- 실시간 처리 현황 파악 불가
- 문제 발생 시 즉각적인 대응 어려움
- 성능 병목 지점 파악 곤란

## 💡 해결 방안

### 1. MongoDB Bulk Operations 도입

\`\`\`typescript
async processBatchEmails(userIds: string[]) {
  const bulkOps = [];
  const batchSize = 1000;

  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);
    const users = await this.userModel
      .find({ _id: { $in: batch } })
      .select('email name preferences')
      .lean();

    // 배치 단위로 작업 준비
    for (const user of users) {
      bulkOps.push({
        insertOne: {
          document: {
            userId: user._id,
            email: user.email,
            status: 'queued',
            createdAt: new Date(),
          },
        },
      });
    }
  }

  // 한 번의 작업으로 처리
  if (bulkOps.length > 0) {
    await this.emailLogModel.bulkWrite(bulkOps);
  }
}
\`\`\`

### 2. Bull Queue를 활용한 작업 큐 구현

\`\`\`typescript
@Processor('email')
export class EmailProcessor {
  @Process('send')
  async handleSendEmail(job: Job<EmailJobData>) {
    try {
      const { to, name, template, preferences } = job.data;
      
      // 이메일 발송 처리
      await this.mailerService.sendMail({
        to,
        subject: '뉴스레터',
        html: await this.renderTemplate(template, { name, preferences }),
      });

      // 성공 로그 기록
      await this.emailLogModel.updateOne(
        { email: to },
        { 
          $set: { 
            status: 'completed',
            completedAt: new Date(),
          }
        }
      );
    } catch (error) {
      // 실패 처리 및 재시도
      throw error;
    }
  }
}
\`\`\`

### 3. 모니터링 시스템 구축

\`\`\`typescript
@Controller('email')
export class EmailController {
  @Get('stats')
  async getEmailStats() {
    const stats = await Promise.all([
      this.emailLogModel.countDocuments(),
      this.emailLogModel.countDocuments({ status: 'completed' }),
      this.emailLogModel.countDocuments({ status: 'failed' }),
      this.emailLogModel.countDocuments({ status: 'queued' }),
    ]);

    return {
      total: stats[0],
      completed: stats[1],
      failed: stats[2],
      queued: stats[3],
      successRate: (stats[1] / stats[0]) * 100,
    };
  }
}
\`\`\`

## 📈 결과

### 1. 성능 개선
- 배치 처리 도입으로 처리 시간 75% 감소
- 메모리 사용량 60% 절감
- 데이터베이스 부하 45% 감소

### 2. 안정성 향상
- 이메일 발송 성공률 99.9% 달성
- 자동 재시도로 일시적 실패 95% 복구
- 시스템 다운타임 제로 유지

### 3. 운영 효율성
- 실시간 모니터링으로 문제 조기 발견
- 자동화된 알림으로 대응 시간 단축
- 상세한 로깅으로 문제 해결 시간 단축

## 🎓 교훈

### 1. 배치 처리의 중요성
대규모 데이터 처리에서 배치 작업은 필수입니다. 적절한 배치 크기 설정과 벌크 연산은 성능을 크게 향상시킵니다.

### 2. 큐 시스템의 가치
Bull Queue와 같은 큐 시스템은 단순한 작업 대기열 이상의 가치를 제공합니다:
- 재시도 메커니즘
- 작업 우선순위 관리
- 동시성 제어
- 실패 복구

### 3. 모니터링의 필요성
시스템이 복잡해질수록 모니터링의 중요성이 커집니다. 예방적 모니터링과 알림은 문제를 조기에 발견하고 해결하는 데 핵심적입니다.

## 🚀 다음 단계

현재 시스템을 더욱 개선하기 위한 계획입니다:

1. 머신러닝 기반 최적 발송 시간 예측
2. 사용자 행동 분석을 통한 개인화 강화
3. 실시간 A/B 테스트 시스템 도입

## 📚 참고 자료

- [Bull Queue 공식 문서](https://github.com/OptimalBits/bull)
- [MongoDB Bulk Operations 가이드](https://docs.mongodb.com/manual/core/bulk-write-operations/)
- [NestJS 공식 문서](https://docs.nestjs.com/)
    `,
    coverImage: "https://raw.githubusercontent.com/hyodakim/blog-resources/main/images/email-automation.png",
    status: "published",
    categories: ["Backend", "DevOps"],
    tags: ["NestJS", "MongoDB", "Bull Queue", "TypeScript", "Email", "성능최적화"],
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-08"),
  },
];

async function seedPosts() {
  try {
    await connectToDatabase();
    
    // 기존 데이터 삭제
    await Post.deleteMany({});
    
    // 샘플 데이터 입력
    const result = await Post.insertMany(samplePosts);
    
    console.log(`Successfully seeded ${result.length} posts`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding posts:', error);
    process.exit(1);
  }
}

seedPosts(); 