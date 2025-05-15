import { Router } from 'express';
import {
  getAllRewards,
  getRewardById,
  createReward,
  updateReward,
  deleteReward
} from '../controllers/rewardController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllRewards);
router.get('/:id', getRewardById);
router.post('/', authenticateToken, createReward);
router.put('/:id', authenticateToken, updateReward);
router.delete('/:id', authenticateToken, deleteReward);

export default router;