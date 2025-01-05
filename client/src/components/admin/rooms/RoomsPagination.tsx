import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const RoomsPagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        <FaArrowLeft />
      </button>
      <span className="text-gray-400">
        {currentPage}/{totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded ${
          currentPage >= totalPages
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default RoomsPagination;
