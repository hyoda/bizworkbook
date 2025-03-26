import clientPromise from '@/lib/mongodb';

export async function getWorkbooks() {
  const client = await clientPromise;
  if (!client) {
    return [];
  }
  const db = client.db("devminelab");
  return db.collection('workbooks').find({}).toArray();
}

export async function createWorkbook(title: string, description: string, steps: string[]) {
  const client = await clientPromise;
  if (!client
  ) {
    return;
  }
  const db = client.db("devminelab");
  return db.collection('workbooks').insertOne({
    title,
    description,
    steps,
    created_at: new Date(),
  });
}
