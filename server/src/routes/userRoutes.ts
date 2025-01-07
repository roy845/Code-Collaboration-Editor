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

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Fetch a paginated list of all users. Admin-only route.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for filtering users.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page.
 *     responses:
 *       200:
 *         description: A list of users and pagination info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllUsersResponse'
 *       401:
 *         description: Unauthorized.
 */
router.get("/", authorizeRoles(UserRole.ADMIN), UserController.getAllUsers); // Admin-only route to get all users

/**
 * @openapi
 * /api/users/{objectId}:
 *   get:
 *     summary: Get user by ID
 *     description: Fetch user details by their ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The user details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserByIdResponse'
 *       404:
 *         description: User not found.
 */
router.get("/:objectId", validateObjectId, UserController.getUserById);

/**
 * @openapi
 * /api/users:
 *   delete:
 *     summary: Delete all users
 *     description: Delete all users from the system. Admin-only route.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users have been deleted.
 *       401:
 *         description: Unauthorized.
 */
router.delete(
  "/",
  authorizeRoles(UserRole.ADMIN),
  UserController.deleteAllUsers
); // Admin-only route to delete all users

/**
 * @openapi
 * /api/users/{objectId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a specific user by their ID. Admin-only route.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: The user has been deleted.
 *       404:
 *         description: User not found.
 */
router.delete(
  "/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  UserController.deleteUser
); // Admin-only route to delete a specific user

/**
 * @openapi
 * /api/users/{objectId}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update user details such as email, username, password, roles, or avatar.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User has been successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       404:
 *         description: User not found.
 */
router.put(
  "/:objectId",
  validateObjectId,
  validateRequest(UpdateUserSchema),
  UserController.updateUserById
);

/**
 * @openapi
 * /api/users/assignRoles/{objectId}:
 *   put:
 *     summary: Assign roles to a user
 *     description: Assign one or more roles to a specific user. Admin-only route.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignRolesRequest'
 *     responses:
 *       200:
 *         description: Roles have been successfully assigned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssignRolesResponse'
 *       404:
 *         description: User not found.
 */
router.put(
  "/assignRoles/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  validateRequest(AssignRolesSchema),
  UserController.assignRoles
); // Admin-only route to assign role to a specific user

/**
 * @openapi
 * /api/users/removeRoles/{objectId}:
 *   put:
 *     summary: Remove roles from a user
 *     description: Remove one or more roles from a specific user. Admin-only route.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveRolesRequest'
 *     responses:
 *       200:
 *         description: Roles have been successfully removed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RemoveRolesResponse'
 *       404:
 *         description: User not found.
 */
router.put(
  "/removeRoles/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  validateRequest(RemoveRolesSchema),
  UserController.removeRoles
); // Admin-only route to remove roles from a specific user

/**
 * @openapi
 * /api/users/removeAllRoles/{objectId}:
 *   put:
 *     summary: Remove all roles from a user
 *     description: Remove all roles from a specific user. Admin-only route.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: All roles have been successfully removed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RemoveAllRolesResponse'
 *       404:
 *         description: User not found.
 */
router.put(
  "/removeAllRoles/:objectId",
  authorizeRoles(UserRole.ADMIN),
  validateObjectId,
  UserController.removeAllRoles
); // Admin-only route to remove roles from a specific user
export default router;
