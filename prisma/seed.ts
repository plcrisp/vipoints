import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Users

  const passwordAlice = await bcrypt.hash('password123', 10);
  const passwordBob = await bcrypt.hash('password456', 10);
  const passwordCharlie = await bcrypt.hash('password789', 10);
  const passwordPedro = await bcrypt.hash('1234567', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@example.com',
        password: passwordAlice,
        phone: '11999999999',
        cep: '01001-000',
        points: 100,
        rank: 1,
      }
    }),
    prisma.user.create({
      data: {
        name: 'Bob',
        email: 'bob@example.com',
        password: passwordBob,
        phone: '11988888888',
        cep: '02002-000',
        points: 200,
        rank: 2,
      }
    }),
    prisma.user.create({
      data: {
        name: 'Charlie',
        email: 'charlie@example.com',
        password: passwordCharlie,
        phone: '11977777777',
        cep: '03003-000',
        points: 300,
        rank: 3,
      }
    }),
    prisma.user.create({
      data: {
        name: 'Pedro Crisp',
        email: 'pedrolcrisp@gmail.com',
        password: passwordPedro,
        phone: '12997833535',
        cep: '03003-000',
        points: 300,
        rank: 1,
        user_type: 'SELLER',
      }
    }),
  ]);

  // Purchases
  await Promise.all([
    prisma.purchase.create({
      data: {
        userId: users[0].id,
        amount: 150.0,
        date: new Date(),
        pointsEarned: 15
      }
    }),
    prisma.purchase.create({
      data: {
        userId: users[1].id,
        amount: 200.0,
        date: new Date(),
        pointsEarned: 20
      }
    }),
    prisma.purchase.create({
      data: {
        userId: users[2].id,
        amount: 300.0,
        date: new Date(),
        pointsEarned: 30
      }
    }),
  ]);

  // Rewards
  const rewards = await Promise.all([
    prisma.reward.create({
      data: {
        name: 'Free Coffee',
        requiredPoints: 50,
        description: 'Get a free coffee',
        availableQuantity: 10
      }
    }),
    prisma.reward.create({
      data: {
        name: 'Movie Ticket',
        requiredPoints: 100,
        description: '1 free ticket',
        availableQuantity: 5
      }
    }),
    prisma.reward.create({
      data: {
        name: 'T-shirt',
        requiredPoints: 150,
        description: 'Branded T-shirt',
        availableQuantity: 2
      }
    }),
  ]);

  // RewardRedemptions
  await Promise.all([
    prisma.rewardRedemption.create({
      data: {
        userId: users[0].id,
        rewardId: rewards[0].id,
        quantity: 1
      }
    }),
    prisma.rewardRedemption.create({
      data: {
        userId: users[1].id,
        rewardId: rewards[1].id,
        quantity: 1
      }
    }),
    prisma.rewardRedemption.create({
      data: {
        userId: users[2].id,
        rewardId: rewards[2].id,
        quantity: 1
      }
    }),
  ]);

  // Ranking
  await Promise.all([
    prisma.ranking.create({ data: { criteria: 'points', month: new Date('2025-01-01') } }),
    prisma.ranking.create({ data: { criteria: 'purchases', month: new Date('2025-02-01') } }),
    prisma.ranking.create({ data: { criteria: 'referrals', month: new Date('2025-03-01') } }),
  ]);

  // DiscountCoupon
  await Promise.all([
    prisma.discountCoupon.create({
      data: {
        type: 'PERCENTAGE',
        discount: 10,
        expirationDate: new Date('2025-12-31')
      }
    }),
    prisma.discountCoupon.create({
      data: {
        type: 'VALUE',
        discount: 20,
        expirationDate: new Date('2025-11-30')
      }
    }),
    prisma.discountCoupon.create({
      data: {
        type: 'PERCENTAGE',
        discount: 5,
        expirationDate: new Date('2025-10-31')
      }
    }),
  ]);

  // UserNotification
  await Promise.all([
    prisma.userNotification.create({
      data: {
        userId: users[0].id,
        message: 'Welcome to the program!',
        sentDate: new Date()
      }
    }),
    prisma.userNotification.create({
      data: {
        userId: users[1].id,
        message: 'Your points were updated!',
        sentDate: new Date()
      }
    }),
    prisma.userNotification.create({
      data: {
        userId: users[2].id,
        message: 'You unlocked a new reward!',
        sentDate: new Date()
      }
    }),
  ]);

  // Promotion
  await Promise.all([
    prisma.promotion.create({
      data: {
        name: 'New Year Bonus',
        description: 'Extra points in January',
        bonusPoints: 50,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
      }
    }),
    prisma.promotion.create({
      data: {
        name: 'Carnival Promo',
        description: 'Earn double points',
        bonusPoints: 100,
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-02-10'),
      }
    }),
    prisma.promotion.create({
      data: {
        name: 'Winter Offer',
        description: 'Special rewards',
        bonusPoints: 70,
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-30'),
      }
    }),
  ]);

  // ReferralProgram
  await Promise.all([
    prisma.referralProgram.create({
      data: {
        referreringUserId: users[0].id,
        refereeUserId: users[1].id,
        rewardPoints: 20,
        status: 'COMPLETED'
      }
    }),
    prisma.referralProgram.create({
      data: {
        referreringUserId: users[1].id,
        refereeUserId: users[2].id,
        rewardPoints: 20,
        status: 'PENDING'
      }
    }),
    // Terceiro usuário indicando o primeiro (para diversificar)
    prisma.referralProgram.create({
      data: {
        referreringUserId: users[2].id,
        refereeUserId: users[0].id,
        rewardPoints: 15,
        status: 'COMPLETED'
      }
    }),
  ]);

  // Logs
  await Promise.all([
    prisma.log.create({
      data: {
        userId: users[0].id,
        transaction: 'PURCHASE',
        amount: 150,
        date: new Date()
      }
    }),
    prisma.log.create({
      data: {
        userId: users[1].id,
        transaction: 'BONUS',
        amount: 50,
        date: new Date()
      }
    }),
    prisma.log.create({
      data: {
        userId: users[2].id,
        transaction: 'REDEMPTION',
        amount: -30,
        date: new Date()
      }
    }),
  ]);
}

main()
  .then(() => {
    console.log('Seed completed!');
    return prisma.$disconnect();
  })
  .catch(e => {
    console.error('Seed failed:', e);
    return prisma.$disconnect();
  });