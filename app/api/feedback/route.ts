import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserId } from '@/lib/auth'; // 사용자 ID 가져오는 함수

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const workbookId = searchParams.get('workbookId');

  if (!workbookId) {
    return NextResponse.json({ error: '워크북 ID가 필요합니다.' }, { status: 400 });
  }

  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db("devminelab");
  const feedbacks = await db.collection('user_feedback').find({ workbook_id: workbookId }).toArray();

  return NextResponse.json(feedbacks);
}

export async function POST(req: Request) {
  const userId = getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { workbook_id, rating, comment } = await req.json();

  if (!workbook_id || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: '올바른 입력값이 필요합니다.' }, { status: 400 });
  }

  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db("devminelab");

  await db.collection('user_feedback').insertOne({
    user_id: userId,
    workbook_id,
    rating,
    comment,
    created_at: new Date(),
  });

  return NextResponse.json({ message: '피드백이 등록되었습니다.' });
}
