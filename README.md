This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

✅ 2. MongoDB에 추천 데이터 추가
추천 기능을 위해 워크북 데이터에 tags(태그) 필드를 추가합니다.

📍 MongoDB에서 workbooks 컬렉션 데이터 구조 변경

```
{
  "_id": "65a8f2b1c9e77c2e8c2b5e6b",
  "title": "IT 스타트업 기획 가이드",
  "description": "IT 스타트업을 시작하는 방법",
  "steps": ["아이디어 검증", "MVP 개발", "투자 유치"],
  "tags": ["스타트업", "IT", "비즈니스"]
}

```

```

{
  "_id": "65a9f3b7c9e77c2e8c2b6e8f",
  "user_id": "abc123",
  "workbook_id": "65a8f2b1c9e77c2e8c2b5e6b",
  "completed_steps": [0, 2], 
  "last_updated": "2025-03-01T10:00:00.000Z"
}

```

```
{
  "_id": "65aa2c4d9a4f4c1e7b2d7f9a",
  "user_id": "abc123",
  "workbook_id": "65a8f2b1c9e77c2e8c2b5e6b",
  "rating": 5,
  "comment": "이 워크북이 정말 도움이 되었어요!",
  "created_at": "2025-03-03T12:00:00.000Z"
}
```

```
{
  "_id": "65ac3b1f9a4c4c1e7b2d8f9a",
  "user_id": "abc123",
  "message": "새로운 워크북이 추가되었습니다!",
  "type": "workbook_update",
  "is_read": false,
  "created_at": "2025-03-10T10:00:00.000Z"
}
```
✔ user_id → 알림을 받을 사용자 ID
✔ message → 알림 내용
✔ type → 알림 유형 (workbook_update, favorite, feedback 등)
✔ is_read → 읽음 여부
✔ created_at → 알림 생성일