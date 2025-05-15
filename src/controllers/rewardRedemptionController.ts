import { Request, Response } from "express";
import { rewardRedemptionRepository } from "../repositories/rewardRedemptionRepository";

export const rewardRedemptionController = {
  async create(req: Request, res: Response) {
    try {
      const { userId, rewardId, quantity } = req.body;
      const redemption = await rewardRedemptionRepository.create({ userId, rewardId, quantity });
      res.status(201).json(redemption);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao criar resgate" });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const redemptions = await rewardRedemptionRepository.findAll();
      res.json(redemptions);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar resgates" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const redemption = await rewardRedemptionRepository.findById(id);
      if (!redemption) return res.status(404).json({ message: "Resgate não encontrado" });
      res.json(redemption);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar resgate" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const updated = await rewardRedemptionRepository.update(id, { quantity });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Erro ao atualizar resgate" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await rewardRedemptionRepository.delete(id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: "Erro ao deletar resgate" });
    }
  },
};
