import { Router } from "express";
import validateObjectId from "../middlewares/validateObjectId.middleware";
import validateRequest from "../middlewares/validateRegisterRequest.middleware";
import RoleController from "../controllers/roleController";
import { RoleNameSchema } from "../schemas/createRole.schema";
import { updateRoleSchema } from "../schemas/updateRoleSchema.schema";

const router = Router();
/**
 * @openapi
 * /api/roles:
 *   get:
 *     summary: Get all roles (paginated)
 *     description: Fetch a paginated list of all roles. Requires JWT authentication.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for filtering roles.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of roles per page.
 *     responses:
 *       200:
 *         description: A list of roles and pagination info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllRolesPaginatedResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to fetch roles.
 */
router.get("/", RoleController.getAllRolesPaginated); // Admin-only route to get all roles paginated

/**
 * @openapi
 * /api/roles/getAllRoles:
 *   get:
 *     summary: Get all roles
 *     description: Fetch a list of all roles. Requires JWT authentication.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of roles.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllRolesResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to fetch roles.
 */
router.get("/getAllRoles", RoleController.getAllRoles); // Admin-only route to get all roles

/**
 * @openapi
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     description: Create a new role. Requires JWT authentication.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleRequest'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateRoleResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to create role.
 */
router.post("/", validateRequest(RoleNameSchema), RoleController.createRole); // Admin-only route to create a role

/**
 * @openapi
 * /api/roles/{objectId}:
 *   get:
 *     summary: Get role by ID
 *     description: Fetch role details by its ID. Requires JWT authentication.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role to retrieve.
 *     responses:
 *       200:
 *         description: The role details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRoleByIdResponse'
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Failed to fetch role.
 */
router.get("/:objectId", validateObjectId, RoleController.getRoleById); // Admin-only route to get role by id

/**
 * @openapi
 * /api/roles:
 *   delete:
 *     summary: Delete all roles
 *     description: Delete all roles in the system. Requires JWT authentication.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All roles have been deleted.
 *       500:
 *         description: Failed to delete roles.
 */
router.delete("/", RoleController.deleteAllRoles); // Admin-only route to delete all roles

/**
 * @openapi
 * /api/roles/{objectId}:
 *   delete:
 *     summary: Delete a role by ID
 *     description: Delete a specific role by its ID. Requires JWT authentication.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role to delete.
 *     responses:
 *       200:
 *         description: Role has been deleted successfully.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Failed to delete the role.
 */
router.delete("/:objectId", validateObjectId, RoleController.deleteRole); // Admin-only route to delete a specific role

/**
 * @openapi
 * /api/roles/{objectId}:
 *   put:
 *     summary: Update a role by ID
 *     description: Update the details of a specific role by its ID. Requires JWT authentication.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleRequest'
 *     responses:
 *       200:
 *         description: Role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateRoleResponse'
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Failed to update role.
 */
router.put(
  "/:objectId",
  validateObjectId,
  validateRequest(updateRoleSchema),
  RoleController.updateRoleById
); // Admin-only route to update a specific role

export default router;
