import Room from "../models/room.model";

class RoomDal {
  static findRoomById(roomId: string) {
    return Room.findOne({ _id: roomId });
  }
  static async getAllRooms() {
    return Room.find();
  }
  static async deleteAllRooms() {
    return Room.deleteMany();
  }

  static async deleteRoomById(roomId: string) {
    return Room.findByIdAndDelete(roomId);
  }
}

export default RoomDal;
