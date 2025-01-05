import { NavigateOptions } from "react-router-dom";
import TableData from "../../table/TableData";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import { RoleDto } from "../../../types/roles.types";

type RoomRowProps = {
  role: RoleDto;
};

const RoleRow = ({ role }: RoomRowProps): JSX.Element => {
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();
  return (
    <tr
      onClick={() => customNavigate(`/admin/roles/${role._id}`)}
      className="bg-[#0d0c26] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
    >
      <TableData label={role._id} />
      <TableData label={role.name} />
    </tr>
  );
};

export default RoleRow;
