"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Instrument_1 = __importDefault(require("../models/Instrument"));
const InstrumentType_1 = __importDefault(require("../models/InstrumentType"));
const router = (0, express_1.Router)();
// GET /api/instruments
router.get("/", async (req, res) => {
    const items = await Instrument_1.default.find().populate("type").lean();
    res.json(items);
});
// POST /api/instruments
router.post("/", async (req, res) => {
    try {
        const { name, brand, year, type, details } = req.body;
        if (!name || !type)
            return res.status(400).json({ msg: "name y type son obligatorios" });
        // validar que exista el tipo
        const found = await InstrumentType_1.default.findById(type);
        if (!found)
            return res.status(400).json({ msg: "Tipo inválido" });
        const inst = await Instrument_1.default.create({ name, brand, year, type, details });
        // devolver con populate
        const populated = await Instrument_1.default.findById(inst._id).populate("type");
        res.status(201).json(populated);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error interno" });
    }
});
// DELETE /api/instruments/:id
router.delete("/:id", async (req, res) => {
    try {
        await Instrument_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: "Instrumento eliminado" });
    }
    catch {
        res.status(500).json({ msg: "Error al eliminar" });
    }
});
exports.default = router;
