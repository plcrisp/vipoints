import { Request, Response } from "express";
import { rewardRedemptionRepository } from "../repositories/rewardRedemptionRepository";
import { userRepository } from "../repositories/userRepository";
import { rewardRepository } from "../repositories/rewardRepository";

export const rewardRedemptionController = {
  async create(req: Request, res: Response) {
    try {
      const { userId, rewardId, quantity } = req.body;

      const user = await userRepository.findById(userId);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      const reward = await rewardRepository.findById(rewardId);
      if (!reward) return res.status(404).json({ message: "Recompensa não encontrada" });

      if (reward.availableQuantity < quantity) {
        return res.status(400).json({ message: "Quantidade indisponível da recompensa" });
      }

      const totalCost = reward.requiredPoints * quantity;
      if (user.points < totalCost) {
        return res.status(400).json({ message: "Pontos insuficientes para o resgate" });
      }

      // Atualiza recompensa e usuário
      await rewardRepository.update(rewardId, {
        availableQuantity: reward.availableQuantity - quantity,
      });

      await userRepository.update(userId, {
        points: user.points - totalCost,
      });

      const redemption = await rewardRedemptionRepository.create({
        userId,
        rewardId,
        quantity,
      });

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
      const { quantity: newQuantity } = req.body;

      const redemption = await rewardRedemptionRepository.findById(id);
      if (!redemption) return res.status(404).json({ message: "Resgate não encontrado" });

      const { quantity: oldQuantity, reward, user } = redemption;
      const diff = newQuantity - oldQuantity;
      const pointDiff = diff * reward.requiredPoints;

      if (diff > 0) {
        if (reward.availableQuantity < diff) {
          return res.status(400).json({ message: "Estoque insuficiente da recompensa" });
        }
        if (user.points < pointDiff) {
          return res.status(400).json({ message: "Pontos insuficientes para atualizar o resgate" });
        }

        await userRepository.update(user.id, {
          points: user.points - pointDiff,
        });

        await rewardRepository.update(reward.id, {
          availableQuantity: reward.availableQuantity - diff,
        });

      } else if (diff < 0) {
        await userRepository.update(user.id, {
          points: user.points - pointDiff, // diff < 0 → -pointDiff = +pontos
        });

        await rewardRepository.update(reward.id, {
          availableQuantity: reward.availableQuantity - diff, // diff < 0 → -diff = +quantidade
        });
      }

      const updated = await rewardRedemptionRepository.update(id, { quantity: newQuantity });
      res.json(updated);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao atualizar resgate" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const redemption = await rewardRedemptionRepository.findById(id);
      if (!redemption) return res.status(404).json({ message: "Resgate não encontrado" });

      const { quantity, reward, user } = redemption;
      const pointsToReturn = quantity * reward.requiredPoints;

      await userRepository.update(user.id, {
        points: user.points + pointsToReturn,
      });

      await rewardRepository.update(reward.id, {
        availableQuantity: reward.availableQuantity + quantity,
      });

      await rewardRedemptionRepository.delete(id);
      res.status(204).end();

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao deletar resgate" });
    }
  }
};
