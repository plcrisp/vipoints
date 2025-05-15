import { Request, Response } from 'express';
import { rewardRepository } from '../repositories/rewardRepository';

export const getAllRewards = async (_: Request, res: Response) => {
  const rewards = await rewardRepository.findAll();
  res.json(rewards);
};

export const getRewardById = async (req: Request, res: Response) => {
  const reward = await rewardRepository.findById(req.params.id);
  if (!reward) return res.status(404).json({ message: 'Recompensa não encontrada' });
  res.json(reward);
};

export const createReward = async (req: Request, res: Response) => {
  const { name, requiredPoints, description, availableQuantity } = req.body;
  const reward = await rewardRepository.create({ name, requiredPoints, description, availableQuantity });
  res.status(201).json(reward);
};

export const updateReward = async (req: Request, res: Response) => {
  const updated = await rewardRepository.update(req.params.id, req.body);
  res.json(updated);
};

export const deleteReward = async (req: Request, res: Response) => {
  await rewardRepository.delete(req.params.id);
  res.status(204).send();
};