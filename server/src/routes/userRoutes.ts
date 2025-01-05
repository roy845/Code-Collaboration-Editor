import { Router } from "express";
import validateObjectId from "../middlewares/validateObjectId.middleware";
import UserController from "../controllers/userController";
import validateRequest from "../middlewares/validateRegisterRequest.middleware";
import { UpdateUserSchema } from "../schemas/updateUser.schema";
import { AssignRolesSchema } from "../schemas/assignRoles.schema";
import { RemoveRolesSchema } from "../schemas/removeRoles.schema";
import authorizeRoles from "../middlewares/authorizeRoles.middleware";
import { UserRole } from "../models/user.model";

const router = Router();

router.get("/", authorizeRoles(UserRole.ADMIN), UserController.getAllUsers); // Admin-only route to get all users
router.get("/:objectId", validateObjectId, UserController.getUserById); // Admin-only route to get user by id
router.delete(
  "/",
  authorizeRoles(UserRole.ADMIN),
  UserController.deleteAllUsers
); // Admin-only route to delete all users
router.delete(
  "/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  UserController.deleteUser
); // Admin-only route to delete a specific user
router.put(
  "/:objectId",
  validateObjectId,
  validateRequest(UpdateUserSchema),
  UserController.updateUserById
); // Admin-only route to update a specific user

router.put(
  "/assignRoles/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  validateRequest(AssignRolesSchema),
  UserController.assignRoles
); // Admin-only route to assign role to a specific user

router.put(
  "/removeRoles/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  validateRequest(RemoveRolesSchema),
  UserController.removeRoles
); // Admin-only route to remove roles from a specific user

router.put(
  "/removeAllRoles/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  UserController.removeAllRoles
); // Admin-only route to remove roles from a specific user
export default router;
