import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected || mongoose.connections[0].readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://wasimaktar:Wasim2002@cluster0.yblvjsd.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0");
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}