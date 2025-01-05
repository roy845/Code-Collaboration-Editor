import { Router } from "express";
import validateObjectId from "../middlewares/validateObjectId.middleware";
import validateRequest from "../middlewares/validateRegisterRequest.middleware";
import RoleController from "../controllers/roleController";
import { RoleNameSchema } from "../schemas/createRole.schema";
import { updateRoleSchema } from "../schemas/updateRoleSchema.schema";

const router = Router();

router.get("/", RoleController.getAllRolesPaginated); // Admin-only route to get all roles paginated
router.get("/getAllRoles", RoleController.getAllRoles); // Admin-only route to get all roles
router.post("/", validateRequest(RoleNameSchema), RoleController.createRole); // Admin-only route to create a role
router.get("/:objectId", validateObjectId, RoleController.getRoleById); // Admin-only route to get role by id
router.delete("/", RoleController.deleteAllRoles); // Admin-only route to delete all roles
router.delete("/:objectId", validateObjectId, RoleController.deleteRole); // Admin-only route to delete a specific role
router.put(
  "/:objectId",
  validateObjectId,
  validateRequest(updateRoleSchema),
  RoleController.updateRoleById
); // Admin-only route to update a specific role

export default router;
