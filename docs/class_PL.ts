enum Discount {
    PERCENTAGE = "PERCENTAGE",
    VALUE = "VALUE"
}
  
enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}

enum Transaction{
    PURCHASE = "PURCHASE",
    REDEMPTION = "REDEMPTION",
    BONUS = "BONUS",
    REFERRAL = "REFERRAL"
}

class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cep: string;
  points: number;
  createdAt: Date
  loyaltyCard: LoyaltyCard;
  purchases: Purchase[];
  rank: number;

  makePurchase(purchase: Purchase): void {}
  redeemReward(reward: Reward): void {}
  applyDiscount(coupon: DiscountCoupon): void {}
  referFriend(friendEmail: string): void {}
  receiveNotification(notification: UserNotification): void {}
  participateInPromotion(promotion: Promotion): void {}
}

class Purchase {
  id: string;
  user: User;
  amount: number;
  date: Date;
  pointsEarned: number;

  calculatePoints(): number { return 0; }
  confirmPurchase(): void {}
}

class LoyaltyCard {
  id: string;
  user: User;
  category: string; 
  points: number;
  expirationDate: Date;

  accumlatePoints(points: number): void {}
  checkBenefeits(): string[] { return ['']; }
  upgradeCategory(): void {}
}

class Reward {
  id: string;
  name: string;
  requiredPoints: number;
  description: string;
  availableQuantity: number;

  redeem(user: User): boolean { return true; }
  checkAvailability(): boolean { return true; }
}

class Ranking {
  id: string;
  criteria: string;
  month: Date;

  generateRanking(users: User): User[] { return []; }
  displayTopUsers(qty: number): User[] { return []; }
  assignReward(): void {}
}

class DiscountCoupon {
  id: string;
  type: Discount;
  discount: number;
  expirationDate: Date;

  applyCoupon(purchase: Purchase): number { return 0; }
  validateCoupon(): boolean { return true; }
}

class UserNotification {
  id: string;
  user: User;
  message: string;
  sentDate: Date;
  read: boolean;

  markAsRead(): void {}
  sendNotification(): void {}
}

class Promotion {
  id: string;
  name: string;
  description: string;
  bonusPoints: number;
  startDate: Date;
  endDate: Date;

  applyPromotion(user: User): void {}
  validatePromotion(): boolean { return true; }
}

class ReferralProgram {
  id: string;
  referreringUser: User;
  refereeUser: User;
  rewardPoints: number;
  status: Status;

  rewardReferrer(): void {}
}

class Log {
  id: string;
  transaction: Transaction;
  user: User;
  amount: number;
  date: Date;

  logTransaction(): void { }
  listTransactions(user: User): Log[] { return []; }
}