import { Suspense } from 'react';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/mongodb';
import { Post, IPost } from '@/lib/models/post';
import BlogListClient from '@/app/blog/BlogListClient';

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams> 
}) {
  const params = await Promise.resolve(searchParams);
  const page = Number(params.page) || 1;
  const category = params.category as string | undefined;
  const tag = params.tag as string | undefined;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">블로그</h1>
      
      {(category || tag) && (
        <div className="mb-8">
          {category && <p>카테고리: {category}</p>}
          {tag && <p>태그: {tag}</p>}
          <Link href="/blog" className="text-blue-600 hover:underline">
            전체 보기
          </Link>
        </div>
      )}
      
      <Suspense fallback={<div>로딩 중...</div>}>
        <BlogListClient page={page} category={category} tag={tag} />
      </Suspense>
    </div>
  );
}
