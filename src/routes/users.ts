import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = Router();

// GET /api/users
router.get("/", async (req, res) => {
     const users = await User.find({}, { passwordHash: 0 }).lean();
     res.json(users);
});

// POST /api/users  -> crear usuario
router.post("/", async (req, res) => {
     try {
     const { name, email, password } = req.body;
     if (!name || !email || !password) return res.status(400).json({ msg: "Faltan datos" });

     const exists = await User.findOne({ email });
     if (exists) return res.status(400).json({ msg: "Email ya registrado" });

     const passwordHash = await bcrypt.hash(password, 10);
     const user = new User({ name, email, passwordHash });
     await user.save();

     const out = user.toObject();
     delete (out as any).passwordHash;
     res.status(201).json(out);
     } catch (err) {
     console.error(err);
     res.status(500).json({ msg: "Error interno" });
     }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
     try {
     const id = req.params.id;
     await User.findByIdAndDelete(id);
     res.json({ msg: "Usuario eliminado" });
     } catch (err) {
     res.status(500).json({ msg: "Error al eliminar" });
     }
});

export default router;