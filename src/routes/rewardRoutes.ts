import { Router } from 'express';
import {
  getAllRewards,
  getRewardById,
  createReward,
  updateReward,
  deleteReward
} from '../controllers/rewardController';

const router = Router();

router.get('/', getAllRewards);
router.get('/:id', getRewardById);
router.post('/', createReward);
router.put('/:id', updateReward);
router.delete('/:id', deleteReward);

export default router;