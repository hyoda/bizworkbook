'use client';

import Link from 'next/link';
import type { Workbook } from '@/types';

export default function WorkbookList({ workbooks }: { workbooks: Workbook[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {workbooks.length > 0 ? (
        workbooks.map((workbook) => (
          <Link key={workbook._id} href={`/workbook/${workbook._id}`} className="block p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-bold">{workbook.title}</h3>
            <p className="text-gray-600">{workbook.description}</p>
          </Link>
        ))
      ) : (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
