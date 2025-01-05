import { HttpStatus } from "../constants/httpStatus";
import { ValidateObjectIdRequest } from "../middlewares/validateObjectId.middleware";
import RoomService from "../services/RoomService";
import { Request, Response } from "express";
import { GetAllRoomsRequest } from "../types/roomTypes";

export class RoomController {
  static async getAllRooms(req: GetAllRoomsRequest, res: Response) {
    try {
      const { search = "", page = 1, limit = 10 } = req.query;
      const { rooms, totalRooms } = await RoomService.getAllRooms(
        search as string,
        Number(page),
        Number(limit)
      );
      res.status(HttpStatus.OK).json({
        rooms,
        totalRooms,
        currentPage: Number(page),
        totalPages: Math.ceil(totalRooms / Number(limit)),
      });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch rooms." });
    }
  }

  static async getRoomById(req: ValidateObjectIdRequest, res: Response) {
    try {
      const { objectId } = req.params;
      const { room, status, message } = await RoomService.getRoomById(
        objectId!
      );
      res.status(status).json({ message, room });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rooms." });
    }
  }

  static async deleteAllRooms(req: Request, res: Response) {
    try {
      await RoomService.deleteAllRooms();
      res
        .status(HttpStatus.OK)
        .json({ message: "All rooms have been deleted." });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete rooms." });
    }
  }

  static async deleteRoom(req: ValidateObjectIdRequest, res: Response) {
    const { objectId } = req.params;
    try {
      const { message, status } = await RoomService.deleteRoom(objectId!);

      res.status(status).json({ message });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete the room." });
    }
  }
}
