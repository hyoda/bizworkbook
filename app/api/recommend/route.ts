import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  const { id, tags } = await req.json();
  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db('bizworkbook');

  // 현재 워크북을 제외하고 동일한 태그를 가진 워크북 검색
  const recommendations = await db
    .collection('workbooks')
    .find({ _id: { $ne: id }, tags: { $in: tags } })
    .limit(3)
    .toArray();

  return NextResponse.json(recommendations);
}
