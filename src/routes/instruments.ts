import { Router } from "express";
import Instrument from "../models/Instrument";
import InstrumentType from "../models/InstrumentType";

const router = Router();

// GET /api/instruments
router.get("/", async (req, res) => {
     const items = await Instrument.find().populate("type").lean();
     res.json(items);
});

// POST /api/instruments
router.post("/", async (req, res) => {
     try {
          const { name, brand, year, type, details } = req.body;
          if (!name || !type) return res.status(400).json({ msg: "name y type son obligatorios" });

          // validar que exista el tipo
          const found = await InstrumentType.findById(type);
          if (!found) return res.status(400).json({ msg: "Tipo inválido" });

          const inst = await Instrument.create({ name, brand, year, type, details });
          // devolver con populate
          const populated = await Instrument.findById(inst._id).populate("type");
          res.status(201).json(populated);
     } catch (err) {
     console.error(err);
     res.status(500).json({ msg: "Error interno" });
     }
});

// DELETE /api/instruments/:id
router.delete("/:id", async (req, res) => {
     try {
          await Instrument.findByIdAndDelete(req.params.id);
          res.json({ msg: "Instrumento eliminado" });
     } catch {
          res.status(500).json({ msg: "Error al eliminar" });
     }
});

export default router;