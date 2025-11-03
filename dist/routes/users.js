"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// GET /api/users
router.get("/", async (req, res) => {
    const users = await User_1.default.find({}, { passwordHash: 0 }).lean();
    res.json(users);
});
// POST /api/users  -> crear usuario
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ msg: "Faltan datos" });
        const exists = await User_1.default.findOne({ email });
        if (exists)
            return res.status(400).json({ msg: "Email ya registrado" });
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, passwordHash });
        await user.save();
        const out = user.toObject();
        delete out.passwordHash;
        res.status(201).json(out);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error interno" });
    }
});
// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await User_1.default.findByIdAndDelete(id);
        res.json({ msg: "Usuario eliminado" });
    }
    catch (err) {
        res.status(500).json({ msg: "Error al eliminar" });
    }
});
exports.default = router;
