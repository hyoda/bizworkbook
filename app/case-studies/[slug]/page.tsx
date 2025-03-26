"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";

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
  content?: string;
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
    category: "Backend",
    content: `
# NestJS 기반 사용자 인증 및 데이터 동기화 시스템 구현

## 프로젝트 개요
NestJS와 Passport/JWT를 활용한 안정적인 사용자 인증 시스템을 구축하고, RMS와의 데이터 동기화를 구현했습니다.

## 주요 기능
- JWT 기반 사용자 인증
- RMS 사용자 데이터 동기화
- Role 기반 접근 제어
- 비동기 데이터 처리

## 기술 스택
\`\`\`typescript
//auth.module.ts
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
\`\`\`

\`\`\`typescript
//auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
\`\`\`

## 데이터 동기화 구현
\`\`\`typescript
// sync.service.ts
@Injectable()
export class SyncService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private rmsService: RmsService,
  ) {}

  async syncUserData(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const rmsData = await this.rmsService.getUserData(user.email);
    await this.userModel.findByIdAndUpdate(userId, {
      $set: {
        rmsData,
        lastSync: new Date(),
      },
    });
  }
}
\`\`\`

## 보안 고려사항
- JWT 토큰 만료 시간 설정
- 비밀번호 해싱
- Rate limiting 적용
- CORS 설정

## 성능 최적화
- 캐싱 전략 수립
- 비동기 처리 최적화
- 데이터베이스 인덱싱

## 결론
안정적이고 확장 가능한 인증 시스템을 구축하고, 효율적인 데이터 동기화를 구현했습니다.
    `
  },
  {
    id: "mongodb-batch-email",
    title: "MongoDB 배치 처리 및 Bull Queue 기반 이메일 자동화 시스템 구현",
    description: "대규모 데이터 처리와 안정적인 이메일 전송을 위한 배치 처리 시스템 구축 사례",
    date: "2024-03-08",
    readTime: "12분",
    tags: ["NestJS", "MongoDB", "Bull Queue", "Email Automation", "TypeScript"],
    slug: "mongodb-batch-email",
    category: "Backend",
    content: `
# MongoDB 배치 처리 및 Bull Queue 기반 이메일 자동화 시스템 구현

## 프로젝트 개요
대규모 사용자를 대상으로 하는 이메일 발송 시스템을 구축하면서, MongoDB의 배치 처리 기능과 Bull Queue를 활용하여 안정적이고 확장 가능한 시스템을 구현했습니다.

## 시스템 아키텍처

### 기술 스택
- NestJS
- MongoDB
- Bull Queue (Redis 기반)
- Nodemailer
- Winston Logger

### 핵심 컴포넌트
\`\`\`typescript
// email.module.ts
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'email',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
    MongooseModule.forFeature([{ name: 'EmailLog', schema: EmailLogSchema }]),
  ],
  providers: [EmailService, EmailProcessor],
  controllers: [EmailController],
})
export class EmailModule {}
\`\`\`

## 배치 처리 구현

### MongoDB Bulk Operations
\`\`\`typescript
// email.service.ts
@Injectable()
export class EmailService {
  constructor(
    @InjectModel('EmailLog') private emailLogModel: Model<EmailLog>,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async processBatchEmails(userIds: string[]) {
    const bulkOps = [];
    const batchSize = 1000;

    // 배치 작업 준비
    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      const users = await this.userModel
        .find({ _id: { $in: batch } })
        .select('email name preferences')
        .lean();

      // 이메일 작업 큐에 추가
      for (const user of users) {
        await this.emailQueue.add('send', {
          to: user.email,
          name: user.name,
          template: 'newsletter',
          preferences: user.preferences,
        });

        // 로그 기록 준비
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

    // 벌크 작업 실행
    if (bulkOps.length > 0) {
      await this.emailLogModel.bulkWrite(bulkOps);
    }
  }
}
\`\`\`

## 이메일 처리 큐 구현

### Bull Queue Processor
\`\`\`typescript
// email.processor.ts
@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private readonly mailerService: MailerService,
    @InjectModel('EmailLog') private emailLogModel: Model<EmailLog>,
  ) {}

  @Process('send')
  async handleSendEmail(job: Job<EmailJobData>) {
    try {
      const { to, name, template, preferences } = job.data;
      
      // 이메일 템플릿 렌더링
      const html = await this.renderTemplate(template, { name, preferences });
      
      // 이메일 전송
      await this.mailerService.sendMail({
        to,
        subject: '뉴스레터',
        html,
      });

      // 로그 업데이트
      await this.emailLogModel.updateOne(
        { email: to },
        { 
          $set: { 
            status: 'completed',
            completedAt: new Date(),
          }
        }
      );

      return { success: true };
    } catch (error) {
      this.logger.error(\`Email sending failed: \${error.message}\`);
      throw error;
    }
  }
}
\`\`\`

## 로그 관리 시스템

### 로그 스키마
\`\`\`typescript
// email-log.schema.ts
export const EmailLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['queued', 'processing', 'completed', 'failed'],
    required: true 
  },
  error: { type: String },
  retryCount: { type: Number, default: 0 },
  createdAt: { type: Date, required: true },
  completedAt: { type: Date },
}, {
  timestamps: true,
  indexes: [
    { email: 1 },
    { status: 1 },
    { createdAt: 1 },
  ]
});
\`\`\`

### 모니터링 API
\`\`\`typescript
// email.controller.ts
@Controller('email')
export class EmailController {
  constructor(
    @InjectModel('EmailLog') private emailLogModel: Model<EmailLog>,
    private readonly emailService: EmailService,
  ) {}

  @Get('stats')
  async getEmailStats() {
    const [
      totalCount,
      completedCount,
      failedCount,
      queuedCount
    ] = await Promise.all([
      this.emailLogModel.countDocuments(),
      this.emailLogModel.countDocuments({ status: 'completed' }),
      this.emailLogModel.countDocuments({ status: 'failed' }),
      this.emailLogModel.countDocuments({ status: 'queued' }),
    ]);

    return {
      total: totalCount,
      completed: completedCount,
      failed: failedCount,
      queued: queuedCount,
      successRate: (completedCount / totalCount) * 100,
    };
  }
}
\`\`\`

## 에러 처리 및 재시도 메커니즘

### 재시도 설정
- Bull Queue의 기본 재시도 메커니즘 활용
- 지수 백오프(Exponential Backoff) 적용
- 최대 재시도 횟수 설정

### 실패 처리
\`\`\`typescript
// email.processor.ts
@OnQueueFailed()
async handleFailure(job: Job, error: Error) {
  const { to } = job.data;
  
  await this.emailLogModel.updateOne(
    { email: to },
    { 
      $set: { 
        status: 'failed',
        error: error.message 
      },
      $inc: { retryCount: 1 }
    }
  );

  // 알림 발송 (Slack, 관리자 이메일 등)
  if (job.attemptsMade >= job.opts.attempts) {
    await this.notificationService.alertAdmins({
      type: 'email_failure',
      data: { email: to, error: error.message }
    });
  }
}
\`\`\`

## 성능 최적화

### 데이터베이스 최적화
- 적절한 인덱스 설정
- 배치 크기 조정
- 쿼리 최적화

### 큐 처리 최적화
- 동시 처리 작업 수 조정
- 메모리 사용량 모니터링
- Redis 연결 풀 관리

## 모니터링 및 알림

### 대시보드 구현
- 실시간 처리 현황
- 에러 발생 추이
- 성공률 통계

### 알림 시스템
- Slack 통합
- 이메일 알림
- 임계치 기반 경고

## 결론
Bull Queue와 MongoDB를 활용한 배치 처리 시스템을 통해 안정적이고 확장 가능한 이메일 자동화 시스템을 구축했습니다. 
특히 다음과 같은 이점을 얻을 수 있었습니다:

- 안정적인 대량 이메일 처리
- 효율적인 에러 처리 및 재시도
- 상세한 모니터링 및 로깅
- 높은 확장성과 유지보수성
    `
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
    content: `
# Next.js OAuth 인증 시스템

## 프로젝트 개요
Supabase를 활용하여 다중 OAuth 인증 시스템과 역할 기반 접근 제어(RBAC)를 구현한 프로젝트입니다.

## 주요 기능
- 다중 OAuth 제공자 지원 (Google, GitHub, Twitter)
- 역할 기반 접근 제어 (RBAC)
- 사용자 세션 관리
- 보안 미들웨어

## 기술 스택
\`\`\`typescript
// auth.config.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
\`\`\`

## OAuth 인증 구현
\`\`\`typescript
// auth.service.ts
export const AuthService = {
  async signInWithProvider(provider: 'google' | 'github' | 'twitter') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: \`\${window.location.origin}/auth/callback\`,
        scopes: 'email profile',
      },
    })
    
    if (error) throw error
    return data
  },

  async handleAuthCallback() {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) throw error
    if (!session) throw new Error('No session found')
    
    // 사용자 역할 설정
    await this.setUserRole(session.user.id)
    
    return session
  }
}
\`\`\`

## RBAC 구현
\`\`\`typescript
// rbac.middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // 역할 기반 접근 제어
  const { data: { role } } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single()

  const path = req.nextUrl.pathname
  if (!hasAccess(role, path)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return res
}
\`\`\`

## 사용자 세션 관리
\`\`\`typescript
// session.hooks.ts
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export function useSession() {
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])
}
\`\`\`

## 보안 고려사항
- CSRF 토큰 구현
- XSS 방지
- 세션 타임아웃 설정
- 보안 헤더 구성

## 성능 최적화
- 정적 페이지 생성 (SSG)
- 증분 정적 재생성 (ISR)
- 클라이언트 상태 관리
- 코드 분할

## 결론
Supabase와 Next.js를 활용하여 안전하고 확장 가능한 OAuth 인증 시스템을 구축했습니다.
주요 성과:
- 다중 OAuth 제공자 통합
- 세분화된 접근 제어
- 보안 강화
- 사용자 경험 개선
    `
  },
  {
    id: "web-billing",
    title: "웹 빌링 시스템 (RevenueCat + Stripe)",
    description: "구독 결제 처리 및 취소 API 핸들링",
    date: "2024-03-05",
    readTime: "15분",
    tags: ["RevenueCat", "Stripe", "Payment", "API", "TypeScript"],
    slug: "web-billing",
    category: "Payment",
    content: `
# 웹 빌링 시스템 (RevenueCat + Stripe)

## 프로젝트 개요
RevenueCat과 Stripe를 통합하여 구독 기반 결제 시스템을 구현한 프로젝트입니다.

## 주요 기능
- 구독 플랜 관리
- 결제 처리 자동화
- 취소 및 환불 처리
- 결제 분석 대시보드

## 기술 스택
\`\`\`typescript
// billing.config.ts
import Stripe from 'stripe'
import { RevenueCat } from 'revenuecat-node'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const revenuecat = new RevenueCat({
  apiKey: process.env.REVENUECAT_API_KEY!,
})
\`\`\`

## 구독 시스템 구현
\`\`\`typescript
// subscription.service.ts
export class SubscriptionService {
  async createSubscription(userId: string, planId: string) {
    // RevenueCat에서 구독 생성
    const subscription = await revenuecat.createSubscription({
      userId,
      planId,
      source: 'stripe',
    })

    // Stripe 결제 처리
    const paymentIntent = await stripe.paymentIntents.create({
      amount: subscription.price,
      currency: 'usd',
      customer: subscription.customerId,
      payment_method_types: ['card'],
    })

    return { subscription, paymentIntent }
  }

  async cancelSubscription(subscriptionId: string) {
    // RevenueCat 구독 취소
    await revenuecat.cancelSubscription(subscriptionId)
    
    // Stripe 환불 처리
    const refund = await stripe.refunds.create({
      payment_intent: subscriptionId,
    })

    return refund
  }
}
\`\`\`

## Webhook 처리
\`\`\`typescript
// webhook.handler.ts
export async function handleWebhook(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature']!
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object)
      break
    case 'payment_intent.failed':
      await handlePaymentFailure(event.data.object)
      break
    case 'customer.subscription.deleted':
      await handleSubscriptionCanceled(event.data.object)
      break
  }

  res.json({ received: true })
}
\`\`\`

## 분석 대시보드
\`\`\`typescript
// analytics.service.ts
export class AnalyticsService {
  async getSubscriptionMetrics() {
    const [
      activeSubscriptions,
      mrr,
      churnRate,
      ltv
    ] = await Promise.all([
      this.getActiveSubscriptions(),
      this.calculateMRR(),
      this.calculateChurnRate(),
      this.calculateLTV()
    ])

    return {
      activeSubscriptions,
      mrr,
      churnRate,
      ltv
    }
  }

  private async calculateMRR() {
    const subscriptions = await revenuecat.getSubscriptions({
      status: 'active'
    })
    
    return subscriptions.reduce((total, sub) => total + sub.price, 0)
  }
}
\`\`\`

## 보안 고려사항
- API 키 관리
- Webhook 서명 검증
- PCI DSS 컴플라이언스
- 데이터 암호화

## 성능 최적화
- 결제 처리 캐싱
- 비동기 웹훅 처리
- 데이터베이스 인덱싱
- 로드 밸런싱

## 결론
RevenueCat과 Stripe를 활용하여 안정적이고 확장 가능한 구독 결제 시스템을 구축했습니다.
주요 성과:
- 자동화된 결제 처리
- 실시간 매출 분석
- 효율적인 구독 관리
- 안전한 결제 처리
    `
  },
  {
    id: "coupang-auto",
    title: "쿠팡 Wing 상품 등록 자동화",
    description: "Puppeteer를 활용한 상품 등록 프로세스 자동화",
    date: "2024-03-04",
    readTime: "10분",
    tags: ["Puppeteer", "Node.js", "Automation", "TypeScript"],
    slug: "coupang-auto",
    category: "Automation",
    content: `
# 쿠팡 Wing 상품 등록 자동화

## 프로젝트 개요
Puppeteer를 활용하여 쿠팡 Wing 플랫폼에서의 상품 등록 프로세스를 자동화한 프로젝트입니다.

## 주요 기능
- 자동 로그인 처리
- 상품 정보 일괄 등록
- 이미지 업로드 자동화
- 옵션 및 재고 관리

## 기술 스택
\`\`\`typescript
// browser.config.ts
import puppeteer from 'puppeteer'

export async function initBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  
  return { browser, page }
}
\`\`\`

## 자동 로그인 구현
\`\`\`typescript
// auth.service.ts
export class WingAuthService {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async login(username: string, password: string) {
    await this.page.goto('https://wing.coupang.com/login')
    
    await this.page.type('#username', username)
    await this.page.type('#password', password)
    
    await Promise.all([
      this.page.click('#loginButton'),
      this.page.waitForNavigation()
    ])

    // 로그인 상태 확인
    const isLoggedIn = await this.checkLoginStatus()
    if (!isLoggedIn) throw new Error('Login failed')
  }

  private async checkLoginStatus() {
    try {
      await this.page.waitForSelector('.user-info', { timeout: 5000 })
      return true
    } catch {
      return false
    }
  }
}
\`\`\`

## 상품 등록 자동화
\`\`\`typescript
// product.service.ts
export class ProductRegistrationService {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async registerProduct(product: ProductData) {
    await this.navigateToNewProductPage()
    
    // 기본 정보 입력
    await this.fillBasicInfo(product)
    
    // 이미지 업로드
    await this.uploadImages(product.images)
    
    // 옵션 정보 입력
    await this.setOptions(product.options)
    
    // 재고 정보 설정
    await this.setInventory(product.inventory)
    
    // 상품 등록 완료
    await this.submitProduct()
  }

  private async fillBasicInfo(product: ProductData) {
    await this.page.type('#productName', product.name)
    await this.page.type('#price', product.price.toString())
    await this.page.select('#category', product.categoryId)
    await this.page.type('#description', product.description)
  }

  private async uploadImages(images: string[]) {
    const uploadInput = await this.page.$('input[type="file"]')
    await uploadInput?.uploadFile(...images)
    
    // 이미지 업로드 완료 대기
    await this.page.waitForSelector('.upload-complete', {
      timeout: 30000
    })
  }
}
\`\`\`

## 배치 처리 시스템
\`\`\`typescript
// batch.service.ts
export class BatchRegistrationService {
  private readonly concurrency = 3
  private productService: ProductRegistrationService

  constructor(productService: ProductRegistrationService) {
    this.productService = productService
  }

  async processBatch(products: ProductData[]) {
    const chunks = this.chunkArray(products, this.concurrency)
    
    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(product => 
          this.productService.registerProduct(product)
            .catch(error => this.handleError(product, error))
        )
      )
    }
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  private async handleError(product: ProductData, error: Error) {
    await this.logError({
      productId: product.id,
      error: error.message,
      timestamp: new Date()
    })
  }
}
\`\`\`

## 에러 처리 및 로깅
\`\`\`typescript
// logger.service.ts
export class LoggerService {
  async logError(error: ErrorLog) {
    await this.saveToDatabase(error)
    
    if (this.isRetryableError(error)) {
      await this.addToRetryQueue(error)
    }
    
    if (this.isCriticalError(error)) {
      await this.notifyAdmin(error)
    }
  }

  private isRetryableError(error: ErrorLog): boolean {
    const retryableErrors = [
      'network_error',
      'timeout',
      'temporary_unavailable'
    ]
    return retryableErrors.includes(error.type)
  }
}
\`\`\`

## 성능 최적화
- 병렬 처리 구현
- 리소스 사용 최적화
- 재시도 메커니즘
- 메모리 관리

## 모니터링 시스템
- 실시간 진행 상황 추적
- 에러 발생 알림
- 성능 메트릭 수집
- 리소스 사용량 모니터링

## 결론
Puppeteer를 활용한 자동화 시스템을 통해 다음과 같은 성과를 달성했습니다:
- 상품 등록 시간 90% 단축
- 인적 오류 95% 감소
- 대량 상품 처리 가능
- 안정적인 자동화 시스템 구축
    `
  },
  {
    id: "octoparse-crawling",
    title: "Octoparse 크롤링 & MongoDB 저장",
    description: "쇼핑몰 상품 데이터 크롤링 및 저장 시스템",
    date: "2024-03-03",
    readTime: "8분",
    tags: ["Octoparse", "MongoDB", "Crawling", "Data"],
    slug: "octoparse-crawling",
    category: "Data",
    content: `
# Octoparse 크롤링 & MongoDB 저장 시스템

## 프로젝트 개요
Octoparse를 활용한 쇼핑몰 상품 데이터 크롤링 및 MongoDB 저장 시스템을 구축한 프로젝트입니다.

## 주요 기능
- 자동 데이터 수집
- 실시간 데이터 정제
- MongoDB 저장 및 관리
- 데이터 동기화 자동화

## 기술 스택
\`\`\`typescript
// database.config.ts
import { MongoClient, Db } from 'mongodb'
import { OctoParse } from 'octoparse-api'

export const mongoClient = new MongoClient(process.env.MONGODB_URI!)
export const octoparse = new OctoParse({
  apiKey: process.env.OCTOPARSE_API_KEY!,
  apiSecret: process.env.OCTOPARSE_API_SECRET!
})
\`\`\`

## 크롤링 작업 구현
\`\`\`typescript
// crawler.service.ts
export class CrawlerService {
  private taskId: string
  private db: Db

  constructor(taskId: string, db: Db) {
    this.taskId = taskId
    this.db = db
  }

  async startCrawling() {
    // 크롤링 작업 시작
    const task = await octoparse.startTask(this.taskId)
    
    // 데이터 수집 상태 모니터링
    await this.monitorTaskProgress(task.id)
    
    // 수집된 데이터 가져오기
    const data = await octoparse.getTaskData(task.id)
    
    // 데이터 정제 및 저장
    await this.processAndSaveData(data)
  }

  private async monitorTaskProgress(taskId: string) {
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        const status = await octoparse.getTaskStatus(taskId)
        if (status === 'completed') {
          clearInterval(interval)
          resolve(true)
        }
      }, 5000)
    })
  }

  private async processAndSaveData(data: any[]) {
    const processed = data.map(item => ({
      ...item,
      processedAt: new Date(),
      normalized: this.normalizeData(item)
    }))

    await this.db.collection('products').insertMany(processed)
  }
}
\`\`\`

## 데이터 정제 시스템
\`\`\`typescript
// data-processor.service.ts
export class DataProcessorService {
  private readonly priceRegex = /[0-9,]+/g
  
  normalizeData(item: RawProductData): NormalizedProduct {
    return {
      name: this.cleanProductName(item.name),
      price: this.extractPrice(item.price),
      category: this.normalizeCategory(item.category),
      specs: this.parseSpecifications(item.specs),
      images: this.processImageUrls(item.images),
      metadata: {
        source: item.source,
        crawledAt: new Date(),
        hash: this.generateHash(item)
      }
    }
  }

  private cleanProductName(name: string): string {
    return name
      .replace(/[\\[\\]\\(\\)]/g, '')
      .replace(/\\s+/g, ' ')
      .trim()
  }

  private extractPrice(priceString: string): number {
    const matches = priceString.match(this.priceRegex)
    if (!matches) return 0
    return parseInt(matches[0].replace(/,/g, ''))
  }
}
\`\`\`

## MongoDB 저장 및 관리
\`\`\`typescript
// storage.service.ts
export class StorageService {
  private db: Db

  constructor(db: Db) {
    this.db = db
  }

  async saveProducts(products: NormalizedProduct[]) {
    const operations = products.map(product => ({
      updateOne: {
        filter: { 'metadata.hash': product.metadata.hash },
        update: { $set: product },
        upsert: true
      }
    }))

    return this.db.collection('products').bulkWrite(operations)
  }

  async createIndexes() {
    await this.db.collection('products').createIndexes([
      { key: { 'metadata.hash': 1 }, unique: true },
      { key: { name: 'text' } },
      { key: { category: 1 } },
      { key: { price: 1 } },
      { key: { 'metadata.crawledAt': 1 } }
    ])
  }
}
\`\`\`

## 동기화 자동화
\`\`\`typescript
// sync.service.ts
export class SyncService {
  private readonly cronSchedule = '0 0 * * *' // 매일 자정
  
  async setupSync() {
    cron.schedule(this.cronSchedule, async () => {
      try {
        await this.performSync()
      } catch (error) {
        await this.handleSyncError(error)
      }
    })
  }

  private async performSync() {
    const tasks = await this.getActiveTasks()
    
    for (const task of tasks) {
      const crawler = new CrawlerService(task.id, this.db)
      await crawler.startCrawling()
    }
  }
}
\`\`\`

## 성능 최적화
- 인덱스 최적화
- 벌크 작업 처리
- 캐싱 전략
- 메모리 사용 최적화

## 모니터링 및 알림
- 크롤링 상태 모니터링
- 데이터 품질 체크
- 에러 알림 시스템
- 성능 메트릭 수집

## 결론
Octoparse와 MongoDB를 활용하여 효율적인 데이터 수집 및 관리 시스템을 구축했습니다:
- 데이터 수집 자동화
- 높은 데이터 정확도
- 효율적인 저장 구조
- 안정적인 운영 시스템
    `
  },
  {
    id: "electron-desktop",
    title: "Electron 기반 데스크톱 앱",
    description: "크로스 플랫폼 데스크톱 앱 개발 및 배포 시스템",
    date: "2024-03-02",
    readTime: "15분",
    tags: ["Electron", "React", "TypeScript", "IPC", "Auto Update"],
    slug: "electron-desktop",
    category: "Desktop",
    content: `
# Electron 기반 데스크톱 앱 개발

## 프로젝트 개요
Electron과 React를 활용하여 크로스 플랫폼 데스크톱 애플리케이션을 개발하고, 자동 업데이트 시스템을 구축한 프로젝트입니다.

## 주요 기능
- 크로스 플랫폼 지원 (Windows, macOS)
- IPC 통신 시스템
- 자동 업데이트
- 시스템 트레이 통합
- 오프라인 데이터 동기화

## 기술 스택
\`\`\`typescript
// electron/main.ts
import { app, BrowserWindow, ipcMain, Tray } from 'electron'
import { autoUpdater } from 'electron-updater'
import isDev from 'electron-is-dev'
import path from 'path'

class MainProcess {
  private mainWindow: BrowserWindow | null = null
  private tray: Tray | null = null
  
  constructor() {
    this.initApp()
    this.setupUpdater()
  }

  private initApp() {
    app.whenReady().then(() => {
      this.createWindow()
      this.setupIPC()
      this.createTray()
    })
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })

    this.mainWindow.loadURL(
      isDev
        ? 'http://localhost:3000'
        : \`file://\${path.join(__dirname, '../build/index.html')}\`
    )
  }
}
\`\`\`

## IPC 통신 구현
\`\`\`typescript
// electron/ipc.ts
export class IPCHandler {
  constructor() {
    this.setupHandlers()
  }

  private setupHandlers() {
    // 파일 시스템 접근
    ipcMain.handle('fs:readFile', async (_, path) => {
      try {
        return await fs.promises.readFile(path, 'utf-8')
      } catch (error) {
        throw new Error(\`Failed to read file: \${error.message}\`)
      }
    })

    // 시스템 정보 조회
    ipcMain.handle('system:info', () => {
      return {
        platform: process.platform,
        arch: process.arch,
        version: app.getVersion(),
        memory: process.getSystemMemoryInfo()
      }
    })

    // 데이터베이스 작업
    ipcMain.handle('db:query', async (_, query) => {
      try {
        return await this.dbService.executeQuery(query)
      } catch (error) {
        throw new Error(\`Database error: \${error.message}\`)
      }
    })
  }
}

// preload.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  fs: {
    readFile: (path: string) => ipcRenderer.invoke('fs:readFile', path)
  },
  system: {
    getInfo: () => ipcRenderer.invoke('system:info')
  },
  db: {
    query: (query: string) => ipcRenderer.invoke('db:query', query)
  }
})
\`\`\`

## 자동 업데이트 시스템
\`\`\`typescript
// electron/updater.ts
export class UpdaterService {
  constructor() {
    this.configure()
    this.setupEventHandlers()
  }

  private configure() {
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = true
    
    if (process.platform === 'darwin') {
      autoUpdater.setFeedURL({
        provider: 's3',
        bucket: 'my-app-updates',
        path: '/mac',
      })
    }
  }

  private setupEventHandlers() {
    autoUpdater.on('checking-for-update', () => {
      this.sendStatusToWindow('업데이트 확인 중...')
    })

    autoUpdater.on('update-available', (info) => {
      this.sendStatusToWindow('업데이트 가능', info)
      this.showUpdateDialog(info)
    })

    autoUpdater.on('download-progress', (progress) => {
      this.sendStatusToWindow('다운로드 중', progress)
    })

    autoUpdater.on('update-downloaded', () => {
      this.sendStatusToWindow('업데이트 준비 완료')
      this.showRestartDialog()
    })
  }

  private async showUpdateDialog(info: any) {
    const { response } = await dialog.showMessageBox({
      type: 'info',
      title: '업데이트 알림',
      message: \`새로운 버전이 있습니다. (v\${info.version})\`,
      buttons: ['지금 업데이트', '나중에']
    })

    if (response === 0) {
      autoUpdater.downloadUpdate()
    }
  }
}
\`\`\`

## 시스템 트레이 통합
\`\`\`typescript
// electron/tray.ts
export class TrayService {
  private tray: Tray | null = null
  private contextMenu: Menu | null = null

  constructor(private window: BrowserWindow) {
    this.createTray()
    this.setupContextMenu()
  }

  private createTray() {
    this.tray = new Tray(path.join(__dirname, 'icons/tray.png'))
    this.tray.setToolTip('My Desktop App')
    
    this.tray.on('click', () => {
      this.window.isVisible() ? this.window.hide() : this.window.show()
    })
  }

  private setupContextMenu() {
    this.contextMenu = Menu.buildFromTemplate([
      {
        label: '열기',
        click: () => this.window.show()
      },
      {
        label: '상태 확인',
        click: () => this.checkStatus()
      },
      { type: 'separator' },
      {
        label: '종료',
        click: () => app.quit()
      }
    ])

    this.tray.setContextMenu(this.contextMenu)
  }
}
\`\`\`

## 오프라인 데이터 동기화
\`\`\`typescript
// services/sync.service.ts
export class DataSyncService {
  private readonly db: Database
  private syncQueue: Queue

  constructor() {
    this.db = new Database('local.db')
    this.syncQueue = new Queue('sync')
    this.setupSyncJob()
  }

  async syncData() {
    const pendingChanges = await this.db.getPendingChanges()
    
    for (const change of pendingChanges) {
      await this.syncQueue.add('sync', {
        type: change.type,
        data: change.data,
        timestamp: change.timestamp
      }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        }
      })
    }
  }

  private async setupSyncJob() {
    this.syncQueue.process('sync', async (job) => {
      try {
        await this.apiService.sync(job.data)
        await this.db.markAsSynced(job.data.id)
      } catch (error) {
        if (!this.isRetryable(error)) {
          await this.db.markAsFailed(job.data.id, error)
          throw error
        }
      }
    })
  }
}
\`\`\`

## 보안 고려사항
- 코드 서명
- 업데이트 검증
- IPC 통신 보안
- 데이터 암호화

## 성능 최적화
- 메모이제이션 활용
- 이미지 최적화
- 가상화 리스트
- 네트워크 캐싱

## 테스트 전략
- 단위 테스트
- 통합 테스트
- E2E 테스트
- 성능 테스트

## 배포 프로세스
\`\`\`typescript
// electron-builder.config.js
module.exports = {
  appId: 'com.myapp.desktop',
  productName: 'My Desktop App',
  
  mac: {
    category: 'public.app-category.productivity',
    target: ['dmg', 'zip'],
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/entitlements.mac.plist',
  },
  
  win: {
    target: ['nsis'],
    certificateFile: process.env.WIN_CSC_LINK,
    certificatePassword: process.env.WIN_CSC_KEY_PASSWORD,
  },
  
  publish: {
    provider: 's3',
    bucket: 'my-app-updates',
  },
  
  afterSign: 'scripts/notarize.js',
}
\`\`\`

## 결론
Electron을 활용하여 다음과 같은 성과를 달성한 크로스 플랫폼 데스크톱 앱을 개발했습니다:
- 안정적인 크로스 플랫폼 지원
- 효율적인 IPC 통신 구현
- 자동화된 업데이트 시스템
- 안전한 오프라인 데이터 처리
    `
  },
  {
    id: "react-native-mobile",
    title: "React Native 모바일 앱",
    description: "크로스 플랫폼 모바일 앱 개발 및 상태 관리 시스템",
    date: "2024-03-01",
    readTime: "12분",
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Mobile"],
    slug: "react-native-mobile",
    category: "Mobile",
    content: `
# React Native 모바일 앱 개발

## 프로젝트 개요
React Native와 TypeScript를 활용하여 크로스 플랫폼 모바일 애플리케이션을 개발하고, 효율적인 상태 관리 시스템을 구축한 프로젝트입니다.

## 주요 기능
- 크로스 플랫폼 UI/UX
- 상태 관리 시스템
- 네이티브 모듈 통합
- 오프라인 지원
- 푸시 알림

## 기술 스택
\`\`\`typescript
// app.config.ts
import { ExpoConfig } from '@expo/config'

const config: ExpoConfig = {
  name: 'My Mobile App',
  slug: 'my-mobile-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.myapp.mobile'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.myapp.mobile'
  }
}

export default config
\`\`\`

## 상태 관리 구현
\`\`\`typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'settings']
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    settings: persistReducer(persistConfig, settingsReducer),
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)
\`\`\`

## 네이티브 모듈 통합
\`\`\`typescript
// modules/biometric.ts
import * as LocalAuthentication from 'expo-local-authentication'

export class BiometricService {
  async authenticate(): Promise<boolean> {
    try {
      const available = await LocalAuthentication.hasHardwareAsync()
      if (!available) return false

      const enrolled = await LocalAuthentication.isEnrolledAsync()
      if (!enrolled) return false

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: '생체 인증을 진행해주세요',
        fallbackLabel: '대체 인증 방법'
      })

      return result.success
    } catch (error) {
      console.error('Biometric error:', error)
      return false
    }
  }
}
\`\`\`

## 네비게이션 시스템
\`\`\`typescript
// navigation/index.tsx
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            presentation: 'modal',
            headerStyle: {
              backgroundColor: theme.colors.primary
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
\`\`\`

## 푸시 알림 구현
\`\`\`typescript
// services/notification.ts
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

export class NotificationService {
  constructor() {
    this.configure()
  }

  private async configure() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      return false
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: '기본',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    return true
  }

  async scheduleNotification(content: NotificationContent, trigger?: NotificationTrigger) {
    return Notifications.scheduleNotificationAsync({
      content: {
        title: content.title,
        body: content.body,
        data: content.data
      },
      trigger
    })
  }
}
\`\`\`

## 오프라인 지원
\`\`\`typescript
// services/offline.ts
import NetInfo from '@react-native-community/netinfo'
import { Queue } from 'queue'

export class OfflineManager {
  private syncQueue: Queue
  private isOnline: boolean = true

  constructor() {
    this.setupNetworkListener()
    this.initSyncQueue()
  }

  private setupNetworkListener() {
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected ?? false
      
      if (this.isOnline) {
        this.processPendingActions()
      }
    })
  }

  private async processPendingActions() {
    const pendingActions = await this.getPendingActions()
    
    for (const action of pendingActions) {
      await this.syncQueue.add(async () => {
        try {
          await this.syncAction(action)
          await this.markActionCompleted(action.id)
        } catch (error) {
          await this.handleSyncError(action, error)
        }
      })
    }
  }

  async queueOfflineAction(action: OfflineAction) {
    await this.saveAction(action)
    
    if (this.isOnline) {
      await this.processPendingActions()
    }
  }
}
\`\`\`

## UI 컴포넌트 시스템
\`\`\`typescript
// components/Card.tsx
import { StyleSheet, View, ViewProps } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

interface CardProps extends ViewProps {
  elevation?: number
  radius?: number
}

export function Card({
  children,
  elevation = 2,
  radius = 8,
  style,
  ...props
}: CardProps) {
  return (
    <Shadow
      distance={elevation}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0.0)"
      radius={radius}
    >
      <View
        style={[
          styles.container,
          { borderRadius: radius },
          style
        ]}
        {...props}
      >
        {children}
      </View>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16
  }
})
\`\`\`

## 성능 최적화
- 메모이제이션 활용
- 이미지 최적화
- 가상화 리스트
- 네트워크 캐싱

## 테스트 전략
- 단위 테스트
- 통합 테스트
- E2E 테스트
- 성능 테스트

## 배포 프로세스
\`\`\`typescript
// eas.json
{
  "cli": {
    "version": ">= 0.52.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id",
        "ascAppId": "your-app-id",
        "appleTeamId": "your-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
\`\`\`

## 결론
React Native를 활용하여 다음과 같은 성과를 달성한 크로스 플랫폼 모바일 앱을 개발했습니다:
- 효율적인 크로스 플랫폼 개발
- 안정적인 상태 관리
- 네이티브 기능 통합
- 오프라인 지원 구현
    `
  },
  {
    id: "microservices-arch",
    title: "마이크로서비스 아키텍처 구현",
    description: "NestJS와 gRPC를 활용한 확장 가능한 마이크로서비스 시스템 구축",
    date: "2024-02-28",
    readTime: "20분",
    tags: ["NestJS", "gRPC", "Microservices", "Docker", "Kubernetes"],
    slug: "microservices-arch",
    category: "Architecture",
    content: `
# 마이크로서비스 아키텍처 구현

## 프로젝트 개요
NestJS와 gRPC를 활용하여 확장 가능하고 타입 안전한 마이크로서비스 아키텍처를 구축한 프로젝트입니다.

## 주요 기능
- 서비스 간 gRPC 통신
- 서비스 디스커버리
- 분산 트랜잭션 처리
- 로깅 및 모니터링
- 컨테이너 오케스트레이션

## 기술 스택
\`\`\`typescript
// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, 'proto/user.proto'),
          url: process.env.USER_SERVICE_URL
        }
      },
      {
        name: 'ORDER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'order',
          protoPath: join(__dirname, 'proto/order.proto'),
          url: process.env.ORDER_SERVICE_URL
        }
      }
    ]),
    PrometheusModule.register()
  ]
})
export class AppModule {}
\`\`\`

## 서비스 정의
\`\`\`protobuf
// proto/user.proto
syntax = "proto3";

package user;

service UserService {
  rpc FindOne (UserById) returns (User) {}
  rpc FindAll (Empty) returns (Users) {}
  rpc Create (CreateUserDto) returns (User) {}
  rpc Update (UpdateUserDto) returns (User) {}
  rpc Delete (UserById) returns (Empty) {}
}

message UserById {
  string id = 1;
}

message User {
  string id = 1;
  string email = 2;
  string name = 3;
  string role = 4;
  string created_at = 5;
  string updated_at = 6;
}

message Users {
  repeated User users = 1;
}

message CreateUserDto {
  string email = 1;
  string name = 2;
  string password = 3;
}

message UpdateUserDto {
  string id = 1;
  optional string name = 2;
  optional string password = 3;
}

message Empty {}
\`\`\`

## gRPC 서비스 구현
\`\`\`typescript
// user/user.controller.ts
@Controller()
export class UserController implements OnModuleInit {
  @Client({ transport: Transport.GRPC })
  private client: ClientGrpc;
  private userService: UserService;

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(data: UserById): Promise<User> {
    try {
      const user = await this.userService.findOne({ id: data.id }).toPromise();
      if (!user) throw new RpcException('User not found');
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('UserService', 'Create')
  async create(data: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return this.userService.create({
        ...data,
        password: hashedPassword
      }).toPromise();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
\`\`\`

## 분산 트랜잭션 처리
\`\`\`typescript
// order/order.service.ts
@Injectable()
export class OrderService {
  constructor(
    @Inject('USER_PACKAGE') private readonly userClient: ClientGrpc,
    @Inject('PAYMENT_PACKAGE') private readonly paymentClient: ClientGrpc,
    private readonly orderRepository: OrderRepository
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const userService = this.userClient.getService<UserService>('UserService');
    const paymentService = this.paymentClient.getService<PaymentService>('PaymentService');

    // 분산 트랜잭션 시작
    const session = await this.orderRepository.startTransaction();
    
    try {
      // 사용자 검증
      const user = await userService.findOne({ id: data.userId }).toPromise();
      if (!user) throw new Error('User not found');

      // 결제 처리
      const payment = await paymentService.process({
        userId: user.id,
        amount: data.amount
      }).toPromise();

      // 주문 생성
      const order = await this.orderRepository.create({
        userId: user.id,
        paymentId: payment.id,
        items: data.items,
        amount: data.amount
      }, { session });

      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw new RpcException(error.message);
    }
  }
}
\`\`\`

## 서비스 디스커버리
\`\`\`typescript
// discovery/consul.config.ts
import { ConsulOptions } from 'consul';

export const consulConfig: ConsulOptions = {
  host: process.env.CONSUL_HOST || 'localhost',
  port: parseInt(process.env.CONSUL_PORT) || 8500,
  defaults: {
    token: process.env.CONSUL_TOKEN
  }
};

// discovery/consul.service.ts
@Injectable()
export class ConsulService implements OnModuleInit {
  constructor(
    private readonly consul: Consul,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    const serviceId = uuid();
    const serviceName = this.configService.get('SERVICE_NAME');
    const servicePort = this.configService.get('SERVICE_PORT');

    await this.consul.agent.service.register({
      id: serviceId,
      name: serviceName,
      port: servicePort,
      check: {
        http: \`http://localhost:\${servicePort}/health\`,
        interval: '10s'
      }
    });
  }

  async getServiceAddress(serviceName: string): Promise<string> {
    const services = await this.consul.catalog.service.nodes(serviceName);
    if (!services.length) {
      throw new Error(\`Service \${serviceName} not found\`);
    }
    
    const service = services[0];
    return \`\${service.ServiceAddress}:\${service.ServicePort}\`;
  }
}
\`\`\`

## 로깅 시스템
\`\`\`typescript
// logging/winston.config.ts
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonConfig = {
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new transports.File({
      filename: 'logs/combined.log'
    })
  ]
};

// logging/correlation.middleware.ts
@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers['x-correlation-id'] || uuid();
    req.headers['x-correlation-id'] = correlationId;
    
    this.logger.setContext(\`[\${correlationId}]\`);
    next();
  }
}
\`\`\`

## 모니터링 시스템
\`\`\`typescript
// monitoring/prometheus.service.ts
@Injectable()
export class PrometheusService {
  private readonly requestCounter: Counter;
  private readonly requestDuration: Histogram;
  private readonly activeConnections: Gauge;

  constructor() {
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status']
    });

    this.requestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'path']
    });

    this.activeConnections = new Gauge({
      name: 'active_connections',
      help: 'Number of active connections'
    });
  }

  recordRequest(method: string, path: string, status: number, duration: number) {
    this.requestCounter.inc({ method, path, status });
    this.requestDuration.observe({ method, path }, duration);
  }

  setActiveConnections(count: number) {
    this.activeConnections.set(count);
  }
}
\`\`\`

## 컨테이너 배포
\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  user-service:
    build:
      context: ./user-service
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - CONSUL_HOST=consul
      - MONGODB_URI=mongodb://mongodb:27017/users
    depends_on:
      - mongodb
      - consul

  order-service:
    build:
      context: ./order-service
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - CONSUL_HOST=consul
      - MONGODB_URI=mongodb://mongodb:27017/orders
    depends_on:
      - mongodb
      - consul

  payment-service:
    build:
      context: ./payment-service
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - CONSUL_HOST=consul
      - MONGODB_URI=mongodb://mongodb:27017/payments
    depends_on:
      - mongodb
      - consul

  api-gateway:
    build:
      context: ./api-gateway
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - CONSUL_HOST=consul
    depends_on:
      - consul

  consul:
    image: consul:latest
    ports:
      - "8500:8500"

  mongodb:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
\`\`\`

## Kubernetes 배포
\`\`\`yaml
# kubernetes/user-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 50051
        env:
        - name: NODE_ENV
          value: "production"
        - name: CONSUL_HOST
          value: "consul-service"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: uri
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 5
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 50051
    targetPort: 50051
  type: ClusterIP
\`\`\`

## 성능 최적화
- gRPC 스트리밍 활용
- 캐싱 전략 구현
- 커넥션 풀링
- 로드 밸런싱

## 장애 대응
- 서킷 브레이커 패턴
- 재시도 메커니즘
- 폴백 전략
- 헬스 체크

## 보안 고려사항
- 서비스 간 인증
- TLS 암호화
- API 게이트웨이 보안
- 접근 제어

## 결론
NestJS와 gRPC를 활용하여 다음과 같은 성과를 달성했습니다:
- 확장 가능한 마이크로서비스 아키텍처 구축
- 효율적인 서비스 간 통신
- 안정적인 분산 트랜잭션 처리
- 체계적인 모니터링 시스템
    `
  }
];

export default function CaseStudy() {
  const params = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const foundStudy = caseStudies.find(s => s.slug === params.slug);
    setStudy(foundStudy || null);
  }, [params.slug]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [study]);

  if (!study) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">케이스 스터디를 찾을 수 없습니다.</h1>
          <Button asChild>
            <Link href="/case-studies">목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4">
          <Button asChild variant="ghost" className="mb-8 text-primary-foreground hover:text-primary-foreground/80">
            <Link href="/case-studies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Link>
          </Button>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-6">{study.title}</h1>
            <div className="flex items-center gap-4 text-sm mb-8">
              {study.date && <span>{study.date}</span>}
              {study.date && study.readTime && <span>•</span>}
              {study.readTime && <span>{study.readTime} 읽기</span>}
            </div>
            <p className="text-lg leading-relaxed">{study.description}</p>
            {study.tags && study.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {study.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          {study.content && (
            <div className="markdown-content">
              {(() => {
                const lines = study.content.split('\n');
                const elements = [];
                
                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i];
                  
                  // 코드 블록 처리
                  if (line.startsWith('```')) {
                    const language = line.slice(3).trim();
                    const codeBlockLines = [];
                    let j = i + 1;
                    
                    // 코드 블록 끝까지 찾기
                    while (j < lines.length) {
                      const currentLine = lines[j];
                      if (currentLine.startsWith('```')) break;
                      codeBlockLines.push(currentLine);
                      j++;
                    }
                    
                    const codeBlock = codeBlockLines.join('\n');
                    
                    elements.push(
                      <pre key={i} className={cn(
                        "relative p-4 rounded-lg bg-muted overflow-x-auto",
                        "font-mono text-sm leading-relaxed"
                      )}>
                        <div className="absolute top-3 right-3 text-xs text-muted-foreground px-2 py-1 rounded bg-primary/10">
                          {language}
                        </div>
                        <code className={`language-${language}`}>
                          {codeBlock}
                        </code>
                      </pre>
                    );
                    
                    // 코드 블록의 끝으로 인덱스 이동
                    i = j;
                    continue;
                  }
                  
                  // 인라인 코드 처리
                  if (line.includes('`')) {
                    const parts = line.split('`');
                    elements.push(
                      <p key={i} className="mb-4">
                        {parts.map((part, idx) => {
                          if (idx % 2 === 0) return part;
                          return (
                            <code key={idx} className="px-1.5 py-0.5 rounded bg-muted text-sm">
                              {part}
                            </code>
                          );
                        })}
                      </p>
                    );
                    continue;
                  }

                  // 헤더 처리
                  if (line.startsWith('#')) {
                    const level = line.match(/^#+/)?.[0].length || 1;
                    const text = line.replace(/^#+\s+/, '');
                    elements.push(
                      React.createElement(
                        `h${level}`,
                        { 
                          key: i, 
                          className: cn(
                            "font-bold tracking-tight",
                            {
                              'text-4xl mb-8': level === 1,
                              'text-3xl mb-6': level === 2,
                              'text-2xl mb-4': level === 3,
                              'text-xl mb-4': level === 4,
                              'text-lg mb-3': level === 5,
                              'text-base mb-3': level === 6,
                            }
                          )
                        },
                        text
                      )
                    );
                    continue;
                  }

                  // 리스트 아이템 처리
                  if (line.startsWith('-')) {
                    elements.push(
                      <li key={i} className="mb-2 text-base leading-relaxed">
                        {line.slice(2)}
                      </li>
                    );
                    continue;
                  }

                  // 빈 줄 처리
                  if (line.trim() === '') {
                    elements.push(<div key={i} className="h-4" />);
                    continue;
                  }

                  // 일반 텍스트 처리
                  elements.push(
                    <p key={i} className="mb-4 text-base leading-relaxed">
                      {line}
                    </p>
                  );
                }
                
                return elements;
              })()}
            </div>
          )}
        </div>
      </section>
    </article>
  );
} 