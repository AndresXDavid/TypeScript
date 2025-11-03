import mongoose from "mongoose";

export async function connectDB(uri: string) {
     if (!uri) {
          console.error("MONGO_URI no definido");
          process.exit(1);
     }
     try {
          await mongoose.connect(uri);
          console.log("MongoDB conectado");
     } catch (err) {
          console.error("Error conectando MongoDB", err);
          process.exit(1);
     }
}