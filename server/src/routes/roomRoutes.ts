import { Router } from "express";
import { RoomController } from "../controllers/RoomController";
import validateObjectId from "../middlewares/validateObjectId.middleware";

const router = Router();

router.get("/", RoomController.getAllRooms); // Admin-only route to get all rooms
router.delete("/", RoomController.deleteAllRooms); // Admin-only route to delete all rooms
router.delete("/:objectId", validateObjectId, RoomController.deleteRoom); // Admin-only route to delete a specific room

export default router;
