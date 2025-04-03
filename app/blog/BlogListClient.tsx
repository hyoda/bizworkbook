'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IPost } from '@/lib/models/post';

interface BlogListProps {
  page: number;
  category?: string;
  tag?: string;
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function Pagination({ currentPage, totalPages }: { 
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex justify-center gap-2 py-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Link
          key={pageNum}
          href={`/blog?page=${pageNum}`}
          className={`px-4 py-2 rounded ${
            pageNum === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {pageNum}
        </Link>
      ))}
    </div>
  );
}

export default function BlogListClient({ page, category, tag }: BlogListProps) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        if (category) params.append('category', category);
        if (tag) params.append('tag', tag);

        const response = await fetch(`/api/posts?${params.toString()}`);
        const data = await response.json();
        
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [page, category, tag]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p>게시물이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <article key={post._id?.toString()} className="border-b pb-8">
          <div className="group cursor-pointer">
            {post.coverImage && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>
            )}
            <Link 
              href={`/blog/${post.slug}`}
              className="block group-hover:text-blue-600"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
            </Link>
            <div className="text-sm text-gray-500 mb-4">
              {formatDate(post.createdAt)}
            </div>
            <div className="flex gap-2 flex-wrap">
              {post.categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${category}`}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
                >
                  {category}
                </Link>
              ))}
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="text-sm bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </article>
      ))}
      
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
} 