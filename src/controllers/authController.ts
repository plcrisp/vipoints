import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
