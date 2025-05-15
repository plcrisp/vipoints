import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const rewardRedemptionRepository = {
  create(data: {
    userId: string;
    rewardId: string;
    quantity: number;
  }) {
    return prisma.rewardRedemption.create({ data });
  },

  findAll() {
    return prisma.rewardRedemption.findMany({
      include: { user: true, reward: true },
    });
  },

  findById(id: string) {
    return prisma.rewardRedemption.findUnique({
      where: { id },
      include: { user: true, reward: true },
    });
  },

  update(id: string, data: { quantity?: number }) {
    return prisma.rewardRedemption.update({
      where: { id },
      data,
    });
  },

  delete(id: string) {
    return prisma.rewardRedemption.delete({ where: { id } });
  },
};
