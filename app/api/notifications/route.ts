import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserId } from '@/lib/auth';

export async function GET() {
  const userId = getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  if (!client) return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  const db = client.db("devminelab");
  const notifications = await db
    .collection('user_notifications')
    .find({ user_id: userId, is_read: false })
    .sort({ created_at: -1 })
    .toArray();

  return NextResponse.json(notifications);
}

export async function POST(req: Request) {
  const { user_id, message, type } = await req.json();

  const client = await clientPromise;
  if (!client) return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  const db = client.db("devminelab");

  await db.collection('user_notifications').insertOne({
    user_id,
    message,
    type,
    is_read: false,
    created_at: new Date(),
  });

  return NextResponse.json({ message: '알림이 생성되었습니다.' });
}

export async function PUT() {
  const userId = getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  if (!client) return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  const db = client.db("devminelab");

  await db.collection('user_notifications').updateMany(
    { user_id: userId, is_read: false },
    { $set: { is_read: true } }
  );

  return NextResponse.json({ message: '모든 알림이 읽음 처리되었습니다.' });
}
