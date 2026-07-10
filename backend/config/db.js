import mongoose from "mongoose";
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, error: null };
}

const getMongoHost = (uri) => {
  if (!uri) {
    return null;
  }

  const match = uri.match(/@([^/?]+)/);
  return match ? match[1] : null;
};

export const validateMongoUri = (uri = process.env.MONGO_URI) => {
  if (!uri) {
    return "MONGO_URI is not set. Add your MongoDB Atlas connection string in Vercel environment variables.";
  }

  const host = getMongoHost(uri);

  if (!host || host === "cluster.mongodb.net") {
    return "MONGO_URI uses an invalid Atlas host. Replace cluster.mongodb.net with your real cluster host, for example cluster0.xxxxx.mongodb.net.";
  }

  return null;
};

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (cached.error) {
    throw cached.error;
  }

  const validationError = validateMongoUri();
  if (validationError) {
    const error = new Error(validationError);
    cached.error = error;
    console.error("=== MONGODB CONFIG ERROR ===", validationError);
    throw error;
  }

  if (!cached.promise) {
    const host = getMongoHost(process.env.MONGO_URI);
    console.log("Connecting to MongoDB host:", host);

    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((connection) => {
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
      })
      .catch((error) => {
        cached.error = error;
        cached.promise = null;
        console.error("=== MONGODB ERROR ===", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export const getDbStatus = () => {
  const validationError = validateMongoUri();
  if (validationError) {
    return { connected: false, error: validationError };
  }

  if (cached.error) {
    return { connected: false, error: cached.error.message };
  }

  return {
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState
  };
};
