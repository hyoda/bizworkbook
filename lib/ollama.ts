export async function getAiRecommendation(prompt: string) {
  const response = await fetch(`${process.env.OLLAMA_API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: "llama2",  // 사용할 모델 지정
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error("AI 추천 가이드를 생성하는데 실패했습니다.");
  }

  const data = await response.json();
  return data.response;
}
