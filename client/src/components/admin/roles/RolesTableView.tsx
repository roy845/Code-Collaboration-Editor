import Spinner from "../../common/Spinner";
import Error from "../../Error";
import DataTable from "../../table/DataTable";

import { PaginatedRolesResponseDto, RoleDto } from "../../../types/roles.types";
import NoSearchRolesResults from "./NoSearchRoleResults";
import RolesPerPage from "./RolesPerPage";
import RoomSearchInput from "../rooms/RoomSearchInput";
import RolesPagination from "./RolesPagination";
import RoleRow from "./RoleRow";
import RoleSearchInput from "./RoleSearchInput";
import { FaPlus } from "react-icons/fa";

type RolesTableViewProps = {
  rolesResponse: PaginatedRolesResponseDto;
  isLoading: boolean;
  error: any;
  searchRoles: string;
  limit: number | "all";
  page: number;
  handleSearchChange: (value: string) => void;
  handleLimitChange: (value: number | "all") => void;
  handlePageChange: (newPage: number) => void;
  customNavigate: (path: string) => void;
  toggleModal: () => void;
};

const RolesTableView: React.FC<RolesTableViewProps> = ({
  rolesResponse,
  isLoading,
  error,
  searchRoles,
  limit,
  page,
  handleSearchChange,
  handleLimitChange,
  handlePageChange,
  customNavigate,
  toggleModal,
}) => {
  const handleAddRole = () => {
    customNavigate("/admin/roles/new");
  };
  return (
    <div className="w-full">
      {/* Top Controls Section */}
      <div className="flex items-center gap-4 mb-6 w-full">
        <RoleSearchInput value={searchRoles} onChange={handleSearchChange} />
        <RolesPerPage value={limit} onChange={handleLimitChange} />
        {!isLoading && rolesResponse?.roles?.length !== 0 && rolesResponse && (
          <button
            onClick={toggleModal}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete All Roles
          </button>
        )}
        <button
          onClick={handleAddRole}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <FaPlus />
          <span>Add Role</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center mt-8">
            <Error
              error={
                error?.response?.data?.error
                  ? error?.response?.data?.error
                  : error?.response?.data?.message
              }
            />
          </div>
        ) : rolesResponse?.roles?.length === 0 || !rolesResponse ? (
          <NoSearchRolesResults />
        ) : (
          <>
            <DataTable<RoleDto>
              items={rolesResponse?.roles || []}
              headers={["ID", "NAME"]}
              numOfHeaders={2}
              renderRow={(role: RoleDto, _) => (
                <RoleRow key={role._id} role={role} />
              )}
            />
            {limit !== "all" &&
              rolesResponse &&
              rolesResponse?.totalPages > 1 && (
                <RolesPagination
                  currentPage={page}
                  totalPages={rolesResponse?.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default RolesTableView;
