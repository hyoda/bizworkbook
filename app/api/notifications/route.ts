import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { getUserId } from '@/lib/auth';

export async function GET() {
  try {
    const userId = getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = await connectToDatabase();
    const notifications = await db
      .collection('user_notifications')
      .find({ user_id: userId, is_read: false })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('알림 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, message, type } = await req.json();

    const db = await connectToDatabase();

    await db.collection('user_notifications').insertOne({
      user_id,
      message,
      type,
      is_read: false,
      created_at: new Date(),
    });

    return NextResponse.json({ message: '알림이 생성되었습니다.' });
  } catch (error) {
    console.error('알림 생성 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const userId = getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = await connectToDatabase();

    await db.collection('user_notifications').updateMany(
      { user_id: userId, is_read: false },
      { $set: { is_read: true } }
    );

    return NextResponse.json({ message: '모든 알림이 읽음 처리되었습니다.' });
  } catch (error) {
    console.error('알림 읽음 처리 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
