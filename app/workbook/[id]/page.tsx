'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DeleteModal from '@/components/DeleteModal';
import Link from 'next/link';
import { handleError } from '@/lib/errorHandler';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Workbook = {
  _id: string;
  title: string;
  description: string;
  steps: string[];
  tags: string[];
  content: string;
};

export default function WorkbookDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [recommendations, setRecommendations] = useState<Workbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** ✅ 워크북 데이터 & AI 추천 & 진행률 불러오기 */
  useEffect(() => {
    async function fetchWorkbookData() {
      try {
        const response = await fetch(`/api/workbooks/${id}`);
        if (!response.ok) throw new Error('워크북을 찾을 수 없습니다.');
        const data: Workbook = await response.json();
        setWorkbook(data);

        // ✅ 사용자 진행률 데이터 불러오기
        const progressRes = await fetch(`/api/progress?workbookId=${id}`);
        if (!progressRes.ok) throw new Error('진행률을 불러오는 중 오류 발생');
        const progressData = await progressRes.json();
        console.log('progressData', progressData);
        setCompletedSteps(progressData.completed_steps || []);

        // ✅ AI 실행 가이드 추천 호출
        const aiRes = await fetch('/api/ai-guide', {
          method: 'POST',
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            steps: data.steps,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!aiRes.ok) throw new Error('AI 추천을 불러오는 중 오류 발생');
        const aiData = await aiRes.json();
        setAiRecommendation(aiData.recommendation || '');

        // ✅ AI 추천된 워크북 가져오기
        const recommendRes = await fetch('/api/recommend', {
          method: 'POST',
          body: JSON.stringify({ id: data._id, tags: data.tags }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!recommendRes.ok) throw new Error('추천 워크북을 불러오는 중 오류 발생');
        const recommendData = await recommendRes.json();
        setRecommendations(recommendData);
      } catch (error) {
        handleError(error, setMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkbookData();
  }, [id]);

  /** ✅ 워크북 삭제 */
  async function handleDelete() {
    try {
      const response = await fetch('/api/workbooks', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('삭제 실패');
      router.push('/workbook');
    } catch (error) {
      handleError(error, setMessage);
    }
  }

  /** ✅ 체크리스트 상태 업데이트 */
  async function handleStepToggle(stepIndex: number) {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        body: JSON.stringify({ workbook_id: id, stepIndex }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('진행 상태 업데이트 실패');

      setCompletedSteps((prev) =>
        prev.includes(stepIndex) ? prev.filter((s) => s !== stepIndex) : [...prev, stepIndex]
      );
    } catch (error) {
      handleError(error, setMessage);
    }
  }

  /** ✅ 로딩 상태 처리 */
  if (loading) return <p className="text-center">로딩 중...</p>;
  if (!workbook) return <p className="text-center text-red-500">{message}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      {/* ✅ 워크북 정보 */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{workbook.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{workbook.description}</p>

        {/* ✅ 태그 표시 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {workbook.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* ✅ 워크북 ID */}
        <p className="text-sm text-gray-500">워크북 ID: {workbook._id}</p>
      </div>

      {/* ✅ 마크다운 컨텐츠 표시 */}
      {/* <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{workbook.content}</ReactMarkdown>
      </div> */}
      <div className="prose prose-lg max-w-full p-4 bg-white shadow-md rounded-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {workbook.content}
        </ReactMarkdown>
      </div>
      {/* ✅ 체크리스트 UI */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">단계별 실행 가이드</h2>
        <ul className="list-none space-y-2">
          {workbook?.steps?.length ? (
            workbook.steps.map((step: string, index: number) => (
              <li key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={completedSteps.includes(index)}
                  onChange={() => handleStepToggle(index)}
                  className="w-5 h-5"
                />
                <span className={`text-gray-700 ${completedSteps.includes(index) ? 'line-through' : ''}`}>
                  {step}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">실행 단계를 불러오는 중...</p>
          )}
        </ul>
      </div>

      {/* ✅ AI 추천 실행 가이드 */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">AI 맞춤 실행 가이드</h2>
        {aiRecommendation ? (
          <p className="mt-2 text-gray-700">{aiRecommendation}</p>
        ) : (
          <p className="text-gray-500">추천을 불러오는 중...</p>
        )}
      </div>

      {/* ✅ AI 추천된 워크북 */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">추천 워크북</h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <Link key={rec._id} href={`/workbook/${rec._id}`} className="block p-4 bg-gray-100 rounded">
                <h3 className="text-xl font-bold">{rec.title}</h3>
                <p className="text-gray-600">{rec.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">추천할 워크북이 없습니다.</p>
        )}
      </div>

      {/* ✅ 수정 및 삭제 버튼 */}
      <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/workbook/${id}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            수정하기
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            삭제하기
          </button>
          <button
            onClick={() => router.push('/workbook')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            목록으로
          </button>
          {/* 즐겨찾기 버튼 */}
          {/* <FavoriteButton workbookId={id as string} /> */}
          {/* 📌 공유 버튼 추가 */}
          {/* <ShareButton workbookId={id as string} title={workbook.title} /> */}
        </div>
      </div>


      {/* ✅ 삭제 확인 모달 */}
      {isModalOpen && <DeleteModal onConfirm={handleDelete} onClose={() => setIsModalOpen(false)} />}

      {/* ✅ 에러 메시지 출력 */}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
