import { Router } from "express";
import { rewardRedemptionController } from "../controllers/rewardRedemptionController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/", rewardRedemptionController.create);
router.get("/", rewardRedemptionController.getAll);
router.get("/:id", rewardRedemptionController.getById);
router.put("/:id", rewardRedemptionController.update);
router.delete("/:id", rewardRedemptionController.delete);

export default router;