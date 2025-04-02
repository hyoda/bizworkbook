import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserId } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const userId = getUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    const db = client.db("devminelab");

    // 공개 워크북이거나 사용자가 소유한 워크북만 조회
    const workbooks = await db.collection('workbooks').find({
      $or: [
        { isPublic: true },
        { userId: userId }
      ]
    }).toArray();

    return NextResponse.json(workbooks);
  } catch (error) {
    console.error('🚨 워크북 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = getUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, slug, description, tags, content, published } = await req.json();

    // 유효성 검사
    if (!title || !slug) {
      return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 });
    }

    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    const db = client.db("devminelab");

    // 동일한 slug가 존재하는지 확인 후 업데이트 or 삽입
    const result = await db.collection('workbooks').updateOne(
      { slug },
      {
        $set: {
          title,
          userId,
          description,
          tags,
          content,
          published,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
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
  const db = client.db("devminelab");

  const result = await db.collection('workbooks').updateOne(
    { _id: id },
    { $set: { title, description, steps } }
  );

  return NextResponse.json({ message: '워크북 수정 완료', success: !!result.modifiedCount });
}

export async function DELETE(req: Request) {
  try {
    const userId = getUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    const db = client.db("devminelab");

    // 워크북 소유자 확인
    const workbook = await db.collection('workbooks').findOne({ _id: new ObjectId(id) });
    if (!workbook || workbook.userId !== userId) {
      return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 });
    }

    const result = await db.collection('workbooks').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: '워크북 삭제 완료', success: !!result.deletedCount });
  } catch (error) {
    console.error('🚨 워크북 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
