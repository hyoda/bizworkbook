import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }
    return mongoose.connection.db;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    cached.conn = await cached.promise;
    if (!mongoose.connection.db) {
      throw new Error('Database connection not established');
    }
    return mongoose.connection.db;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

// MongoDB 필터 타입 정의
export type FilterValue = string | number | boolean | Date | RegExp | { $regex: string; $options: string };
export type FilterCondition = {
  [key: string]: FilterValue | Array<FilterValue> | { [key: string]: FilterValue };
};

export type MongoDBFilter = FilterCondition & {
  $or?: Array<FilterCondition>;
  $and?: Array<FilterCondition>;
};
