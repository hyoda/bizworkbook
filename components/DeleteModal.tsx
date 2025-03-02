'use client';

import { useState } from 'react';

export default function DeleteModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-red-600 text-white px-4 py-2 rounded">
        삭제하기
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">정말 삭제하시겠습니까?</h2>
            <div className="flex space-x-4">
              <button
                onClick={onConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                삭제
              </button>
              <button
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
