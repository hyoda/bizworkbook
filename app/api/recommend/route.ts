import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { id, tags } = await request.json();
    const db = await connectToDatabase();

    // 현재 워크북을 제외하고 동일한 태그를 가진 워크북 검색
    const recommendations = await db
      .collection('workbooks')
      .find({ _id: { $ne: id }, tags: { $in: tags } })
      .limit(3)
      .toArray();

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('추천 워크북 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
