import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('q') || '';  // 검색어
  const tagFilter = searchParams.get('tag');  // 태그 필터

  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db('bizworkbook');

  const query: { title?: { $regex: string, $options: string }, tags?: string } = {};

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: 'i' }; // 대소문자 무시 검색
  }

  if (tagFilter) {
    query.tags = tagFilter; // 태그 필터 적용
  }

  const workbooks = await db.collection('workbooks').find(query).toArray();

  return NextResponse.json(workbooks);
}

export async function POST(req: Request) {
  try {
    const { title, slug, authorId, description, tags, content, published } = await req.json();

    // 유효성 검사
    if (!title || !slug || !authorId) {
      return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 });
    }

    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    const db = client.db('bizworkbook');

    // 동일한 slug가 존재하는지 확인 후 업데이트 or 삽입
    const result = await db.collection('workbooks').updateOne(
      { slug },
      {
        $set: {
          title,
          authorId,
          description,
          tags,
          content,
          published,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true } // slug가 존재하면 업데이트, 없으면 새로 삽입
    );

    return NextResponse.json({ message: '워크북 저장 완료', success: !!result.upsertedId });
  } catch (error) {
    console.error('🚨 워크북 저장 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  const { id, title, description, steps } = await req.json();
  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db('bizworkbook');

  const result = await db.collection('workbooks').updateOne(
    { _id: id },
    { $set: { title, description, steps } }
  );

  return NextResponse.json({ message: '워크북 수정 완료', success: !!result.modifiedCount });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db('bizworkbook');

  const result = await db.collection('workbooks').deleteOne({ _id: id });

  return NextResponse.json({ message: '워크북 삭제 완료', success: !!result.deletedCount });
}
