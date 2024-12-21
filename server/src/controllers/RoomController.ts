import { ValidateObjectIdRequest } from "../middlewares/validateObjectId.middleware";
import RoomService from "../services/RoomService";
import { Request, Response } from "express";

export class RoomController {
  static async getAllRooms(req: Request, res: Response) {
    try {
      const rooms = await RoomService.getAllRooms();
      res.status(200).json({ rooms });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rooms." });
    }
  }
  static async deleteAllRooms(req: Request, res: Response) {
    try {
      await RoomService.deleteAllRooms();
      res.status(200).json({ message: "All rooms have been deleted." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete rooms." });
    }
  }
  static async deleteRoom(req: ValidateObjectIdRequest, res: Response) {
    const { objectId } = req.params;
    try {
      const { message, status } = await RoomService.deleteRoom(objectId!);

      res.status(status).json({ message });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the room." });
    }
  }
}
