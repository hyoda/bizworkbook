/**!SECTION
 * DeleteButton 컴포넌트
 * DeleteModal로 대체 예정.
 */
'use client';

import { useState } from 'react';
import { handleError } from '@/lib/errorHandler';

export default function DeleteButton({ workbookId }: { workbookId: string }) {
  const [message, setMessage] = useState('');

  async function handleDelete() {
    try {
      const response = await fetch(`/api/workbooks/${workbookId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('삭제 실패');

      window.location.href = '/';
    } catch (error) {
      handleError(error, setMessage);
    }
  }

  return (
    <>
      <button
        onClick={handleDelete}
        className="px-4 py-2 rounded bg-red-500 text-white"
      >
        삭제
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </>
  );
}
// 📌 DeleteButton 컴포넌트는 워크북 삭제 버튼을 렌더링합니다.