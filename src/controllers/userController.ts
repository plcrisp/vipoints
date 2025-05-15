import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.findAll();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userRepository.findById(id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedUser = await userRepository.update(id, data);
    res.json(updatedUser);
  } catch {
    res.status(404).json({ message: 'Erro ao atualizar usuário' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userRepository.delete(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Erro ao deletar usuário' });
  }
};