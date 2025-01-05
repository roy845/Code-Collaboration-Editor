import React from "react";

type Props = {
  value: number | "all";
  onChange: (value: number | "all") => void;
};

const RolesPerPage: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="items-per-page" className="text-gray-300">
        Items per page:
      </label>
      <select
        id="items-per-page"
        value={value === "all" ? "all" : value.toString()}
        onChange={(e) =>
          onChange(e.target.value === "all" ? "all" : parseInt(e.target.value))
        }
        className="p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};

export default RolesPerPage;
