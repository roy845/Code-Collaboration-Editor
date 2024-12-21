import { Router } from "express";
import authRoutes from "./authRoutes";
import roomRoutes from "./roomRoutes";
import authenticate from "../middlewares/authenticate.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";

const router = Router();

router.use("/auth", authRoutes);
router.use("/rooms", authenticate, isAdmin, roomRoutes);

export default router;
