import { NavigateOptions } from "react-router-dom";
import { RoomDto } from "../../../types/room.types";
import TableData from "../../table/TableData";
import useCustomNavigate from "../../../hooks/useCustomNavigate";

type RoomRowProps = {
  room: RoomDto;
};

const RoomRow = ({ room }: RoomRowProps): JSX.Element => {
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();
  return (
    <tr
      onClick={() => customNavigate(`/admin/rooms/${room._id}`)}
      className="bg-[#0d0c26] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
    >
      <TableData label={room._id} />
      <TableData label={room.name} />
    </tr>
  );
};

export default RoomRow;
