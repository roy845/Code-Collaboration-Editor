import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const RoomSearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search rooms by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 w-1/3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default RoomSearchInput;
