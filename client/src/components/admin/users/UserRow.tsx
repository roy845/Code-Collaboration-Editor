import { NavigateOptions } from "react-router-dom";
import TableData from "../../table/TableData";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import { UserDto } from "../../../types/users.types";

type UserRowProps = {
  user: UserDto;
};

const UserRow = ({ user }: UserRowProps): JSX.Element => {
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();
  return (
    <tr
      onClick={() => customNavigate(`/admin/users/${user._id}`)}
      className="bg-[#0d0c26] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
    >
      <TableData label={user._id} />
      <TableData label={user.username} />
    </tr>
  );
};

export default UserRow;
