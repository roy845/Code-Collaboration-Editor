import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const RoomNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <MdErrorOutline className="text-6xl text-red-500" />
      <h1 className="text-2xl font-bold mb-4">Room Not Found</h1>
      <p>The room you tried to access does not exist.</p>
      <Link
        to="/home"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default RoomNotFound;
