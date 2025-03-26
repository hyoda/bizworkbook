import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserId } from '@/lib/auth'; // 사용자 ID 가져오는 함수

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  if (!client) return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  const db = client.db('devminelab');
  const favorites = await db.collection('user_favorites').find({ user_id: userId }).toArray();

  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const userId = getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { workbook_id } = await req.json();
  const client = await clientPromise;
  if (!client) return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });

  const db = client.db("devminelab");

  // 이미 즐겨찾기한 워크북인지 확인
  const existingFavorite = await db.collection('user_favorites').findOne({ user_id: userId, workbook_id });

  if (existingFavorite) {
    // 이미 추가된 경우 삭제 (토글 기능)
    await db.collection('user_favorites').deleteOne({ user_id: userId, workbook_id });
    return NextResponse.json({ message: '즐겨찾기에서 제거됨', isFavorite: false });
  } else {
    // 즐겨찾기 추가
    await db.collection('user_favorites').insertOne({
      user_id: userId,
      workbook_id,
      created_at: new Date(),
    });
    return NextResponse.json({ message: '즐겨찾기에 추가됨', isFavorite: true });
  }
}
