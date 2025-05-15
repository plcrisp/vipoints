import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  // 🔍 Buscar por ID
  findById: async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
  },

  // 🔍 Buscar por email
  findByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } });
  },

  // 📋 Buscar todos
  findAll: async (): Promise<User[]> => {
    return await prisma.user.findMany();
  },

  // ➕ Criar novo usuário
  create: async (data: Omit<User, 'id' | 'createdAt' | 'loyaltyCard' | 'purchases' | 'notifications' | 'referralSent' | 'referralReceived' | 'logs'>): Promise<User> => {
    return await prisma.user.create({ data });
  },

  // ✏️ Atualizar usuário por ID
  update: async (id: string, data: Partial<User>): Promise<User> => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  // ❌ Deletar usuário por ID
  delete: async (id: string): Promise<User> => {
    return await prisma.user.delete({
      where: { id },
    });
  },
};