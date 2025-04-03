import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { getUserId } from '@/lib/auth'; // 사용자 ID 가져오는 함수

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const workbookId = searchParams.get('workbookId');

    if (!workbookId) {
      return NextResponse.json({ error: '워크북 ID가 필요합니다.' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const feedbacks = await db.collection('user_feedback').find({ workbook_id: workbookId }).toArray();

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('피드백 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { workbook_id, rating, comment } = await req.json();

    if (!workbook_id || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: '올바른 입력값이 필요합니다.' }, { status: 400 });
    }

    const db = await connectToDatabase();

    await db.collection('user_feedback').insertOne({
      user_id: userId,
      workbook_id,
      rating,
      comment,
      created_at: new Date(),
    });

    return NextResponse.json({ message: '피드백이 등록되었습니다.' });
  } catch (error) {
    console.error('피드백 등록 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
