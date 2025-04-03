import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const tags = await db.collection('tags').find().toArray();

    return NextResponse.json(tags);
  } catch (error) {
    console.error('태그 조회 오류:', error);
    return NextResponse.json({ error: '태그 데이터를 불러올 수 없습니다.' }, { status: 500 });
  }
}
