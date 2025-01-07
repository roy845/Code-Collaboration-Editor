import { Router } from "express";
import { RoomController } from "../controllers/RoomController";
import validateObjectId from "../middlewares/validateObjectId.middleware";

const router = Router();
/**
 * @openapi
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     description: Fetch a paginated list of all rooms. Requires JWT authentication.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for filtering rooms.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of rooms per page.
 *     responses:
 *       200:
 *         description: A list of rooms and pagination info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllRoomsResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to fetch rooms.
 */
router.get("/", RoomController.getAllRooms); // Admin-only route to get all rooms

/**
 * @openapi
 * /api/rooms/{objectId}:
 *   get:
 *     summary: Get room by ID
 *     description: Fetch room details by its ID. Requires JWT authentication.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to retrieve.
 *     responses:
 *       200:
 *         description: The room details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRoomByIdResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Room not found.
 *       500:
 *         description: Failed to fetch the room.
 */
router.get("/:objectId", validateObjectId, RoomController.getRoomById); // Admin-only route to get room by id

/**
 * @openapi
 * /api/rooms:
 *   delete:
 *     summary: Delete all rooms
 *     description: Delete all rooms in the system. Requires JWT authentication.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All rooms have been deleted.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to delete rooms.
 */
router.delete("/", RoomController.deleteAllRooms); // Admin-only route to delete all rooms

/**
 * @openapi
 * /api/rooms/{objectId}:
 *   delete:
 *     summary: Delete a room by ID
 *     description: Delete a specific room by its ID. Requires JWT authentication.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to delete.
 *     responses:
 *       200:
 *         description: The room has been deleted.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Room not found.
 *       500:
 *         description: Failed to delete the room.
 */
router.delete("/:objectId", validateObjectId, RoomController.deleteRoom); // Admin-only route to delete a specific room

export default router;
