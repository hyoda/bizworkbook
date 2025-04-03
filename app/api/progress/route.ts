import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { getUserId } from '@/lib/auth'; // 사용자 ID 가져오는 함수

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const workbookId = searchParams.get('workbookId');

    const db = await connectToDatabase();
    const progress = await db.collection('user_progress').findOne({ user_id: userId, workbook_id: workbookId });

    return NextResponse.json(progress || { completed_steps: [] });
  } catch (error) {
    console.error('진행 상태 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { workbook_id, stepIndex } = await request.json();
    const db = await connectToDatabase();

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
    console.error('진행 상태 업데이트 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}