import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserId } from '@/lib/auth'; // 사용자 ID 가져오는 함수

export async function GET(req: Request) {
  const userId = getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workbookId = searchParams.get('workbookId');

  const client = await clientPromise;
  if (!client) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const db = client.db('bizworkbook');
  const progress = await db.collection('user_progress').findOne({ user_id: userId, workbook_id: workbookId });

  return NextResponse.json(progress || { completed_steps: [] });
}

export async function POST(req: Request) {
  try {
    const { workbook_id, stepIndex } = await req.json();
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    const db = client.db('bizworkbook');

    const progress = await db.collection('progress').findOne({ workbook_id });

    if (progress) {
      const updatedSteps = progress.completed_steps.includes(stepIndex)
        ? progress.completed_steps.filter((s: unknown) => s !== stepIndex)
        : [...progress.completed_steps, stepIndex];

      await db.collection('progress').updateOne(
        { workbook_id },
        { $set: { completed_steps: updatedSteps } }
      );
    } else {
      await db.collection('progress').insertOne({
        workbook_id,
        completed_steps: [stepIndex],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('🚨 진행 상태 업데이트 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}