export type RoomDto = {
  _id: string;
  code: string;
  language: string;
  name: string;
};

export type RoomResponseDto = {
  room: RoomDto;
};

export type RoomsResponseDto = {
  rooms: RoomDto[];
  currentPage: number;
  totalPages: number;
  totalRooms: number;
};
