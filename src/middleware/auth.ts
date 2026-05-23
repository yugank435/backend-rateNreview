import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export interface AuthRequest extends Request {
  user?: { id: string; name: string; email: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) return res.status(401).json({ message: "Login is required for this action." });

  try {
    req.user = jwt.verify(token, config.jwtSecret) as AuthRequest["user"];
    return next();
  } catch {
    return res.status(401).json({ message: "Your session has expired. Please login again." });
  }
};
