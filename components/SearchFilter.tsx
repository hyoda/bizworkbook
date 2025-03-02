'use client';

import { useState, useEffect } from 'react';
import type { Workbook } from '@/types';

export default function SearchFilter({ onResults }: { onResults: (results: Workbook[]) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState<string[]>([]); // ✅ 초기값 빈 배열로 설정

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();

        console.log("✅ API 응답 데이터:", data);

        if (Array.isArray(data)) {
          setTags(data.map((tag) => tag.name)); // ✅ `name` 필드만 저장
        } else {
          console.error("🚨 잘못된 데이터 형식:", data);
          setTags([]); // ✅ 오류 발생 시 빈 배열 설정
        }
      } catch (error) {
        console.error('🚨 태그 로드 실패:', error);
        setTags([]);
      }
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchFilteredWorkbooks() {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('q', searchQuery);
      if (selectedTag) queryParams.append('tag', selectedTag);

      try {
        const response = await fetch(`/api/workbooks?${queryParams.toString()}`);
        const data = await response.json();
        onResults(data);
      } catch (error) {
        console.error('🚨 워크북 검색 실패:', error);
      }
    }
    fetchFilteredWorkbooks();
  }, [searchQuery, selectedTag, onResults]);

  return (
    <div className="mb-4 flex space-x-4">
      <input
        type="text"
        placeholder="검색어 입력..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">태그 선택</option>
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))
        ) : (
          <option disabled>태그 없음</option>
        )}
      </select>
    </div>
  );
}
