'use client';

import { useState, useEffect } from 'react';
import { handleError } from '@/lib/errorHandler';

export default function FavoriteButton({ workbookId }: { workbookId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function checkFavorite() {
      try {
        const response = await fetch(`/api/favorites`);
        const data = await response.json();
        setIsFavorite(data.some((fav: { workbook_id: string }) => fav.workbook_id === workbookId));
      } catch (error) {
        handleError(error, setMessage);
      }
    }
    checkFavorite();
  }, [workbookId]);

  async function handleFavoriteToggle() {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify({ workbook_id: workbookId }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      setIsFavorite(result.isFavorite);

      // 📌 즐겨찾기 추가 시 알림 생성
      await fetch('/api/notifications', {
        method: 'POST',
        body: JSON.stringify({
          user_id: '현재_사용자_ID',
          message: result.isFavorite ? '워크북을 즐겨찾기에 추가했습니다!' : '즐겨찾기에서 제거했습니다.',
          type: 'favorite',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      handleError(error, setMessage);
    }
  }

  return (
    <>
      <button
        onClick={handleFavoriteToggle}
        className={`px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
      >
        {isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </>
  );
}
