import { PrismaClient, Reward } from '@prisma/client';

const prisma = new PrismaClient();

export const rewardRepository = {
  findAll: async (): Promise<Reward[]> => {
    return await prisma.reward.findMany();
  },

  findById: async (id: string): Promise<Reward | null> => {
    return await prisma.reward.findUnique({ where: { id } });
  },

  create: async (data: Omit<Reward, 'id'>): Promise<Reward> => {
    return await prisma.reward.create({ data });
  },

  update: async (id: string, data: Partial<Reward>): Promise<Reward> => {
    return await prisma.reward.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<Reward> => {
    return await prisma.reward.delete({ where: { id } });
  },
};