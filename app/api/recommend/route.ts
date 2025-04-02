import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { id, tags } = await request.json();
  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db("devminelab");

  // 현재 워크북을 제외하고 동일한 태그를 가진 워크북 검색
  const recommendations = await db
    .collection('workbooks')
    .find({ _id: { $ne: id }, tags: { $in: tags } })
    .limit(3)
    .toArray();

  return NextResponse.json(recommendations);
}
