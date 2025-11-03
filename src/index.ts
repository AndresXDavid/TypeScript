import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import userRoutes from "./routes/users";
import typeRoutes from "./routes/types";
import instrumentRoutes from "./routes/instruments";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API
app.use("/api/users", userRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/instruments", instrumentRoutes);

// Servir archivos estáticos desde /public
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// si ruta raíz, servir index.html
app.get("/", (req, res) => {
     res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5500;

connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/instruments")
     .then(() => {
     app.listen(PORT, () => {
          console.log(`Servidor en http://localhost:${PORT}`);
     });
     })
     .catch(err => {
     console.error("No se pudo iniciar el servidor", err);
     });