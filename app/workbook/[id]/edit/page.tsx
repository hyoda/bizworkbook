'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditWorkbookPage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchWorkbook() {
      const response = await fetch(`/api/workbooks/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setSteps(data.steps.join('\n'));
    }
    fetchWorkbook();
  }, [id]);

  async function handleUpdate() {
    const response = await fetch('/api/workbooks', {
      method: 'PUT',
      body: JSON.stringify({ id, title, description, steps: steps.split('\n') }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setMessage('워크북이 수정되었습니다!');
      router.push(`/workbook/${id}`);
    } else {
      setMessage('수정 실패');
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">워크북 수정</h1>
      <input
        type="text"
        value={title}
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        value={steps}
        className="w-full border p-2 rounded mb-2"
        onChange={(e) => setSteps(e.target.value)}
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        수정하기
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}
