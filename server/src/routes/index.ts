import { Router } from "express";
import authRoutes from "./authRoutes";
import roomRoutes from "./roomRoutes";
import authenticate from "../middlewares/authenticate.middleware";
import authorizeRoles from "../middlewares/authorizeRoles.middleware";
import { UserRole } from "../models/user.model";

const router = Router();

router.use("/auth", authRoutes);
router.use("/rooms", authenticate, authorizeRoles(UserRole.ADMIN), roomRoutes);

export default router;
