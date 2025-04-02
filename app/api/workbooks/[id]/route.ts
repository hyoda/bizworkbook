import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: '데이터베이스 클라이언트를 가져올 수 없습니다.' }, { status: 500 });
    }
    const db = client.db("devminelab");
    const workbook = await db.collection('workbooks').findOne({ _id: new ObjectId(id) });

    if (!workbook) {
      return NextResponse.json({ error: '워크북을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(workbook);
  } catch (error) {
    console.error('🚨 워크북 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updates = await request.json();

    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: '데이터베이스 클라이언트를 가져올 수 없습니다.' }, { status: 500 });
    }

    const db = client.db("devminelab");
    const result = await db.collection('workbooks').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ error: '워크북을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('🚨 워크북 업데이트 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
