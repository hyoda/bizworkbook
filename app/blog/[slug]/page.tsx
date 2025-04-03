import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { connectToDatabase } from '@/lib/mongodb';
import { Post, IPost } from '@/lib/models/post';

async function getPost(slug: string) {
  await connectToDatabase();
  const post = await Post.findOne({ slug, status: 'published' }).lean();
  
  if (!post) {
    notFound();
  }
  
  return post as IPost;
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPost(resolvedParams.slug);

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8 group"
          >
            <svg 
              className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            목록으로 돌아가기
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <time className="text-primary-foreground/80">{formatDate(post.createdAt)}</time>
              <span>•</span>
              <span className="text-primary-foreground/80">{post.readTime || '5분'} 읽기</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>
            <p className="text-xl leading-relaxed text-primary-foreground/90 mb-8">{post.description}</p>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category: string) => (
                <Link
                  key={category}
                  href={`/blog?category=${category}`}
                  className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {post.coverImage && (
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] h-[50vh] mb-16">
              <div className="absolute inset-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background" />
              </div>
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold mb-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-bold mt-12 mb-6 text-primary">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-bold mt-8 mb-4">{children}</h3>,
                p: ({children}) => <p className="mb-6 text-muted-foreground leading-relaxed">{children}</p>,
                code: ({ className, children, ...props }: React.HTMLProps<HTMLElement>) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const inline = !match;
                  return inline ? (
                    <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code className="text-sm font-mono text-primary">{children}</code>
                    </pre>
                  );
                },
                ul: ({children}) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
                ol: ({children}) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
                blockquote: ({children}) => (
                  <blockquote className="mt-6 border-l-4 border-primary pl-6 italic">{children}</blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border">
              <h2 className="text-lg font-semibold mb-4">관련 태그</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="text-sm bg-muted hover:bg-muted/80 px-3 py-1 rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
} 