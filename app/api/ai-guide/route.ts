import { NextResponse } from 'next/server';
import { getAiRecommendation } from '@/lib/ollama';

export async function POST(req: Request) {
  const { title, description, steps } = await req.json();
  const prompt = `
    사용자는 '${title}' 워크북을 진행 중입니다.
    설명: ${description}
    현재 단계: ${steps.join(", ")}
    
    다음 실행할 최적의 가이드를 추천해 주세요.
  `;

  try {
    const aiResponse = await getAiRecommendation(prompt);
    return NextResponse.json({ recommendation: aiResponse });
  } catch (error) {

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const { title, description, steps } = await req.json();
    
//     // AI API 호출 (예제)
//     const aiResponse = await fetch('https://ai-api.example.com/generate-guide', {
//       method: 'POST',
//       body: JSON.stringify({ title, description, steps }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     const aiData = await aiResponse.json();
//     return NextResponse.json({ recommendation: aiData.recommendation });
//   } catch (error) {
//     console.error('🚨 AI 추천 오류:', error);
//     return NextResponse.json({ error: '서버 오류' }, { status: 500 });
//   }
// }