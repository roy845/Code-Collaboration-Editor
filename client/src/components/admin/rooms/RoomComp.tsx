import { FaArrowRight } from "react-icons/fa";
import { RoomDto } from "../../../types/room.types";
import { NavigateFunction, useNavigate } from "react-router-dom";

type RoomCompProps = {
  room: RoomDto | undefined;
  onDelete: () => void;
};

const RoomComp: React.FC<RoomCompProps> = ({ room, onDelete }) => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">
          Name: {room?.name}
        </h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-300 w-1/4">ID:</span>
            <span className="text-white">{room?._id}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-300 w-1/4 ml-10">
              Code:
            </span>
            <code className="bg-gray-700 text-green-400 px-2 py-1 rounded">
              {room?.code}
            </code>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-300 w-1/4">Language:</span>
            <span className="text-white">{room?.language}</span>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <div className="mt-6">
            <button
              onClick={onDelete}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Room
            </button>
          </div>

          <div className="mt-7">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:blue-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomComp;
