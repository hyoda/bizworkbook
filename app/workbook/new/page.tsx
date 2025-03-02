'use client';

import { useState } from 'react';

export default function NewWorkbookPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [message, setMessage] = useState('');

  async function handleCreate() {
    const response = await fetch('/api/workbooks', {
      method: 'POST',
      body: JSON.stringify({ title, description, steps: steps.split('\n') }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setMessage('워크북이 추가되었습니다!');
    } else {
      setMessage('워크북 추가 실패');
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">새 워크북 추가</h1>
      <input
        type="text"
        placeholder="제목"
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="설명"
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        placeholder="단계별 실행 (줄바꿈으로 구분)"
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setSteps(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        추가하기
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}
