import Spinner from "../../common/Spinner";
import Error from "../../Error";
import NoSearchRoomResults from "./NoSearchRoomResults";
import { RoomDto, RoomsResponseDto } from "../../../types/room.types";
import DataTable from "../../table/DataTable";
import RoomRow from "./RoomRow";
import RoomsPagination from "./RoomsPagination";
import RoomSearchInput from "./RoomSearchInput";
import RoomsPerPage from "./RoomsPerPage";

type RoomTableViewProps = {
  roomsResponse: RoomsResponseDto;
  isLoading: boolean;
  error: any;
  searchRooms: string;
  limit: number | "all";
  page: number;
  handleSearchChange: (value: string) => void;
  handleLimitChange: (value: number | "all") => void;
  handlePageChange: (newPage: number) => void;
  customNavigate: (path: string) => void;
  toggleModal: () => void;
};

const RoomTableView: React.FC<RoomTableViewProps> = ({
  roomsResponse,
  isLoading,
  error,
  searchRooms,
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
        <RoomSearchInput value={searchRooms} onChange={handleSearchChange} />
        <RoomsPerPage value={limit} onChange={handleLimitChange} />
        {!isLoading && roomsResponse?.rooms?.length !== 0 && roomsResponse && (
          <button
            onClick={toggleModal}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete All Rooms
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
            <Error
              error={
                error?.response?.data?.error
                  ? error?.response?.data?.error
                  : error?.response?.data?.message
              }
            />
          </div>
        ) : roomsResponse?.rooms?.length === 0 || !roomsResponse ? (
          <NoSearchRoomResults />
        ) : (
          <>
            <DataTable<RoomDto>
              items={roomsResponse?.rooms || []}
              headers={["ID", "NAME"]}
              numOfHeaders={2}
              renderRow={(room: RoomDto, _) => (
                <RoomRow key={room._id} room={room} />
              )}
            />
            {limit !== "all" &&
              roomsResponse &&
              roomsResponse?.totalPages > 1 && (
                <RoomsPagination
                  currentPage={page}
                  totalPages={roomsResponse?.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default RoomTableView;
