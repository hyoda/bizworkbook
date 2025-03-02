'use client';

import { useState, useEffect } from 'react';
import { handleError } from '@/lib/errorHandler';
import type { Feedback } from '@/types';


export default function Feedback({ workbookId }: { workbookId: string }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await fetch(`/api/feedback?workbookId=${workbookId}`);
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        handleError(error, setMessage);
      }
    }
    fetchFeedbacks();
  }, [workbookId]);

  async function handleFeedbackSubmit() {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ workbook_id: workbookId, rating, comment }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('피드백 등록 실패');

      setFeedbacks((prev) => [...prev, { 
        rating, 
        comment, 
        created_at: new Date().toISOString(), 
        user_id: 'defaultUserId', 
        workbook_id: workbookId 
      }]);
      setRating(5);
      setComment('');
    } catch (error) {
      handleError(error, setMessage);
    }
  }

  return (
    <div className="mt-8 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold">피드백 남기기</h2>

      {/* ⭐ 별점 선택 */}
      <div className="flex items-center space-x-2 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? 'text-yellow-500' : 'text-gray-400'}
          >
            ★
          </button>
        ))}
      </div>
      
      {/* 📌 댓글 입력 */}
      <textarea
        className="w-full border p-2 rounded mt-2"
        placeholder="리뷰를 남겨주세요..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleFeedbackSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
        등록하기
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
      
      {/* 📌 기존 피드백 목록 출력 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">사용자 피드백</h3>
        {feedbacks.length > 0 ? (
          <ul className="list-none space-y-3 mt-2">
            {feedbacks.map((fb, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                <p className="text-lg">{'★'.repeat(fb.rating)} ({fb.rating}/5)</p>
                <p className="text-gray-600 mt-1">{fb.comment}</p>
                <p className="text-sm text-gray-400 mt-2">{new Date(fb.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">아직 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
