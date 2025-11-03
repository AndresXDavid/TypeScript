import { Router } from "express";
import InstrumentType from "../models/InstrumentType";

const router = Router();

// GET /api/types
router.get("/", async (req, res) => {
     const types = await InstrumentType.find().lean();
     res.json(types);
});

// POST /api/types
router.post("/", async (req, res) => {
     try {
          const { name, description } = req.body;
          if (!name) return res.status(400).json({ msg: "El nombre es obligatorio" });
          const t = await InstrumentType.create({ name, description });
          res.status(201).json(t);
     } catch (err) {
          console.error(err);
          res.status(500).json({ msg: "Error interno" });
     }
});

// DELETE /api/types/:id
router.delete("/:id", async (req, res) => {
     try {
          await InstrumentType.findByIdAndDelete(req.params.id);
          res.json({ msg: "Tipo eliminado" });
     } catch {
          res.status(500).json({ msg: "Error al eliminar" });
     }
});

export default router;