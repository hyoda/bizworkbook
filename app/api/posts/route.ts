import { NextResponse } from 'next/server';
import { connectToDatabase, MongoDBFilter } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { Post } from '@/lib/models/post';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    // 필터 조건 구성
    const filter: MongoDBFilter = { status: 'published' };
    if (category) filter.categories = category;
    if (tag) filter.tags = tag;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // 게시물 조회
    const skip = (page - 1) * limit;
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // 전체 게시물 수 조회
    const total = await Post.countDocuments(filter);

    return NextResponse.json({
      posts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Posts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
} 