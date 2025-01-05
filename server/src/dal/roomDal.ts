import Room from "../models/room.model";

class RoomDal {
  static findRoomById(roomId: string) {
    return Room.findOne({ _id: roomId });
  }
  static async getAllRooms(search: string, skip: number, limit: number) {
    const query = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};

    const rooms = await Room.find(query).skip(skip).limit(limit);

    const totalRooms: number = await Room.countDocuments(query);

    return { rooms, totalRooms };
  }

  static async deleteAllRooms() {
    return Room.deleteMany();
  }

  static async deleteRoomById(roomId: string) {
    return Room.findByIdAndDelete(roomId);
  }
}

export default RoomDal;
