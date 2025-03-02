import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | undefined = undefined;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient> | undefined;
    }
  }
}

if (!(global as unknown as NodeJS.Global)._mongoClientPromise) {
  client = new MongoClient(uri, options);
  (global as unknown as NodeJS.Global)._mongoClientPromise = client.connect();
}

const globalClientPromise = (global as unknown as NodeJS.Global)._mongoClientPromise;
if (!globalClientPromise) {
  throw new Error('MongoClient promise is undefined');
}
clientPromise = globalClientPromise;

export default clientPromise;
