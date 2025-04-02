'use client';

import { useState } from 'react';
import SearchFilter from '@/components/SearchFilter';
import WorkbookList from '@/components/WorkbookList';
import type { Workbook } from '@/types';
import { withAuth } from '@/context/AuthContext';

function WorkbookPage() {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">워크북 목록</h1>

      {/* 📌 검색 & 필터 */}
      <SearchFilter onResults={setWorkbooks} />

      {/* 📌 워크북 리스트 */}
      <WorkbookList workbooks={workbooks} />
    </div>
  );
}

export default withAuth(WorkbookPage);
