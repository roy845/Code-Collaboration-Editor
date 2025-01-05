import Spinner from "../../common/Spinner";
import Error from "../../Error";
import DataTable from "../../table/DataTable";
import UserRow from "./UserRow";
import RoomsPagination from "./UsersPagination";
import { UserDto, UsersResponseDto } from "../../../types/users.types";
import NoSearchUserResults from "./NoSearchUserResults";
import UserSearchInput from "./UserSearchInput";
import UsersPerPage from "./UsersPerPage";

type RoomTableViewProps = {
  usersResponse: UsersResponseDto;
  isLoading: boolean;
  error: string | null;
  searchUsers: string;
  limit: number | "all";
  page: number;
  handleSearchChange: (value: string) => void;
  handleLimitChange: (value: number | "all") => void;
  handlePageChange: (newPage: number) => void;
  customNavigate: (path: string) => void;
  toggleModal: () => void;
};

const UsersTableView: React.FC<RoomTableViewProps> = ({
  usersResponse,
  isLoading,
  error,
  searchUsers,
  limit,
  page,
  handleSearchChange,
  handleLimitChange,
  handlePageChange,
  customNavigate,
  toggleModal,
}) => {
  return (
    <div className="w-full">
      {/* Top Controls Section */}
      <div className="flex items-center gap-4 mb-6 w-full">
        <UserSearchInput value={searchUsers} onChange={handleSearchChange} />
        <UsersPerPage value={limit} onChange={handleLimitChange} />
        {!isLoading && usersResponse?.users?.length !== 0 && usersResponse && (
          <button
            onClick={toggleModal}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete All Users
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center mt-8">
            <Error error={error} />
          </div>
        ) : usersResponse?.users?.length === 0 || !usersResponse ? (
          <NoSearchUserResults />
        ) : (
          <>
            <DataTable<UserDto>
              items={usersResponse?.users || []}
              headers={["ID", "USERNAME"]}
              numOfHeaders={2}
              renderRow={(user: UserDto, _) => (
                <UserRow key={user._id} user={user} />
              )}
            />
            {limit !== "all" &&
              usersResponse &&
              usersResponse?.totalPages > 1 && (
                <RoomsPagination
                  currentPage={page}
                  totalPages={usersResponse?.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTableView;
