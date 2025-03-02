'use client';

import { useEffect, useState } from 'react';
import type { Notification } from '@/types';

export default function Notification() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch {
        setMessage('알림을 불러오는 중 오류 발생');
      }
    }
    fetchNotifications();
  }, []);

  async function markAllAsRead() {
    try {
      await fetch('/api/notifications', { method: 'PUT' });
      setNotifications([]);
    } catch {
      setMessage('알림 읽음 처리 중 오류 발생');
    }
  }

  return (
    <div className="relative">
      <button className="bg-blue-600 text-white px-4 py-2 rounded">🔔 알림 ({notifications.length})</button>
      
      {notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">새로운 알림</h3>
          <ul className="space-y-2">
            {notifications.map((notif, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded">
                {notif.message}
                <p className="text-sm text-gray-400">{new Date(notif.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
          <button onClick={markAllAsRead} className="mt-3 bg-gray-600 text-white px-4 py-2 rounded w-full">
            모두 읽음 처리
          </button>
        </div>
      )}

      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}
