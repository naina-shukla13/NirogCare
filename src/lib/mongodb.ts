import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  // This is necessary for hot reload in development to avoid re-connecting every time
  var mongooseCache: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase(): Promise<Mongoose> {
  const cached = globalWithMongoose.mongooseCache!;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "nirogcare", // Optional: use your actual DB name here
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
