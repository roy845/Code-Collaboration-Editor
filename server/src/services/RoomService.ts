import { HttpStatus } from "../constants/httpStatus";
import RoomDal from "../dal/roomDal";

class RoomService {
  static async getAllRooms() {
    return await RoomDal.getAllRooms();
  }

  static async getRoomById(roomId: string) {
    const room = await RoomDal.findRoomById(roomId);
    let status = 0;
    let message = "";

    if (!room) {
      message = "Room not found.";
      status = HttpStatus.NOT_FOUND;
      return { status, message };
    }

    status = HttpStatus.OK;
    return { room, status };
  }

  static async deleteAllRooms() {
    await RoomDal.deleteAllRooms();
  }
  static async deleteRoom(roomId: string) {
    const room = await RoomDal.deleteRoomById(roomId);

    let message: string = "";
    let status: number = 0;

    if (!room) {
      message = "Room not found.";
      status = HttpStatus.NOT_FOUND;
      return { message, status };
    }

    message = `Room ${room?.name} has been deleted.`;
    status = HttpStatus.OK;
    return { message, status };
  }
}

export default RoomService;
