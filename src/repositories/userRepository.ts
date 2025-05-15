import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  findById: async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
  },

  findByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } });
  },

  findAll: async (): Promise<User[]> => {
    return await prisma.user.findMany();
  },

  create: async (data: Omit<User, 'id' | 'createdAt' | 'loyaltyCard' | 'purchases' | 'notifications' | 'referralSent' | 'referralReceived' | 'logs'>): Promise<User> => {
    return await prisma.user.create({ data });
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<User> => {
    return await prisma.user.delete({
      where: { id },
    });
  },
};