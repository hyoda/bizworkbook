import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Workbook {
  _id: string;
  title: string;
  description: string;
  steps: string[];
  userId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 워크북 접근 권한 체크
export function isWorkbookAccessible(workbook: Workbook, userId: string | null): boolean {
  if (workbook.isPublic) return true;
  if (!userId) return false;
  return workbook.userId === userId;
}

export async function getWorkbooks(userId?: string) {
  const client = await clientPromise;
  if (!client) {
    throw new Error("Database connection failed");
  }
  const db = client.db("devminelab");
  
  // 공개 워크북 또는 사용자의 워크북만 조회
  const query = userId 
    ? { $or: [{ isPublic: true }, { userId }] }
    : { isPublic: true };
    
  return db.collection('workbooks').find(query).toArray();
}

export async function getWorkbook(id: string, userId?: string) {
  const client = await clientPromise;
  if (!client) {
    throw new Error("Database connection failed");
  }
  
  const db = client.db("devminelab");
  const workbook = await db.collection('workbooks').findOne({ _id: new ObjectId(id) });
  
  if (!workbook) {
    throw new Error("워크북을 찾을 수 없습니다.");
  }
  
  if (!isWorkbookAccessible(workbook, userId)) {
    throw new Error("이 워크북에 대한 접근 권한이 없습니다.");
  }
  
  return workbook;
}

export async function createWorkbook(
  title: string, 
  description: string, 
  steps: string[], 
  userId: string,
  isPublic: boolean = false
) {
  const client = await clientPromise;
  if (!client) {
    throw new Error("Database connection failed");
  }
  
  const db = client.db("devminelab");
  return db.collection('workbooks').insertOne({
    title,
    description,
    steps,
    userId,
    isPublic,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function updateWorkbook(
  id: string,
  userId: string,
  updates: Partial<Omit<Workbook, '_id' | 'userId' | 'createdAt'>>
) {
  const client = await clientPromise;
  if (!client) {
    throw new Error("Database connection failed");
  }
  
  const db = client.db("devminelab");
  const workbook = await getWorkbook(id, userId);
  
  if (workbook.userId !== userId) {
    throw new Error("워크북을 수정할 권한이 없습니다.");
  }
  
  return db.collection('workbooks').updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: {
        ...updates,
        updatedAt: new Date()
      }
    }
  );
}

export async function deleteWorkbook(id: string, userId: string) {
  const client = await clientPromise;
  if (!client) {
    throw new Error("Database connection failed");
  }
  
  const db = client.db("devminelab");
  const workbook = await getWorkbook(id, userId);
  
  if (workbook.userId !== userId) {
    throw new Error("워크북을 삭제할 권한이 없습니다.");
  }
  
  return db.collection('workbooks').deleteOne({ _id: new ObjectId(id) });
}
