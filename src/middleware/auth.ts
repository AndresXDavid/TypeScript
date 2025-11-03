import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload { id: string; iat?: number; exp?: number; }

export function auth(req: Request, res: Response, next: NextFunction) {
     const header = req.header("Authorization");
     if (!header) return res.status(401).json({ msg: "No token" });
     const token = header.replace("Bearer ", "");
     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
          (req as any).userId = decoded.id;
     next();
     } catch (err) {
          return res.status(401).json({ msg: "Token inválido" });
     }
}