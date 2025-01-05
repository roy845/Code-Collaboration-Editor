import React from "react";
import { MdSearchOff } from "react-icons/md";

type Props = {};

const NoSearchRoomResults: React.FC<Props> = () => {
  return (
    <div className="text-center mt-8">
      <MdSearchOff size={48} className="text-gray-400 mx-auto" />
      <p className="text-gray-400 mt-4">No rooms found.</p>
    </div>
  );
};

export default NoSearchRoomResults;
