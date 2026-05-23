import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { z } from "zod";
import { config } from "../config";
import { User } from "../models/User";

const router = Router();

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = signupSchema.omit({ name: true });

const makeToken = (user: { _id: unknown; name: string; email: string }) =>
  jwt.sign({ id: String(user._id), name: user.name, email: user.email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  } as SignOptions);

router.post("/signup", async (req, res, next) => {
  try {
    const input = signupSchema.parse(req.body);
    const exists = await User.exists({ email: input.email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "An account already exists for this email." });

    const user = await User.create({
      name: input.name,
      email: input.email,
      passwordHash: await bcrypt.hash(input.password, 12)
    });

    return res.status(201).json({
      token: makeToken(user),
      user: { id: user._id, name: user.name, email: user.email },
      expiresIn: config.jwtExpiresIn
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const user = await User.findOne({ email: input.email.toLowerCase() });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({
      token: makeToken(user),
      user: { id: user._id, name: user.name, email: user.email },
      expiresIn: config.jwtExpiresIn
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
