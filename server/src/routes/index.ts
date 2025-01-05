import { Router } from "express";
import authRoutes from "./authRoutes";
import roomRoutes from "./roomRoutes";
import userRoutes from "./userRoutes";
import roleRoutes from "./roleRoutes";
import authenticate from "../middlewares/authenticate.middleware";
import authorizeRoles from "../middlewares/authorizeRoles.middleware";
import { UserRole } from "../models/user.model";

const router = Router();

router.use("/auth", authRoutes);
router.use("/rooms", authenticate, authorizeRoles(UserRole.ADMIN), roomRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/roles", authenticate, authorizeRoles(UserRole.ADMIN), roleRoutes);

export default router;
