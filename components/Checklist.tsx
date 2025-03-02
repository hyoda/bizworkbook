'use client';

import { useState, useEffect } from 'react';
import { handleError } from '@/lib/errorHandler';

export default function Checklist({ workbookId, steps }: { workbookId: string; steps: string[] }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch(`/api/progress?workbookId=${workbookId}`);
        const data = await response.json();
        setCompletedSteps(data.completed_steps || []);
      } catch (error) {
        handleError(error, setMessage);
      }
    }
    fetchProgress();
  }, [workbookId]);

  async function handleStepToggle(stepIndex: number) {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        body: JSON.stringify({ workbook_id: workbookId, stepIndex }),
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

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">단계별 실행 가이드</h2>
      <ul className="list-none space-y-2">
        {steps.map((step: string, index: number) => (
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
        ))}
      </ul>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}
