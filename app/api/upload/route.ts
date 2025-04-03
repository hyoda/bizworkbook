import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  
  // 기본 세션 확인
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 파일 확장자 검증
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    // 파일명 생성
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const filename = `${timestamp}-${originalName}`;
    
    // uploads 디렉토리 생성
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // 디렉토리가 이미 존재하는 경우 무시
    }
    
    // 파일 저장
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(join(uploadDir, filename), buffer);
    
    // 업로드 정보 DB에 저장
    const db = await connectToDatabase();
    await db.collection('uploads').insertOne({
      userId: session.user.id,
      filename,
      originalName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadPath: `/uploads/${filename}`,
      createdAt: new Date()
    });
    
    // 이미지 URL 반환
    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
} 