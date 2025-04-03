import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { getUserId } from '@/lib/auth'; // 사용자 ID 가져오는 함수

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = await connectToDatabase();
    const favorites = await db.collection('user_favorites').find({ user_id: userId }).toArray();

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('즐겨찾기 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { workbook_id } = await req.json();
    const db = await connectToDatabase();

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
  } catch (error) {
    console.error('즐겨찾기 추가/제거 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
