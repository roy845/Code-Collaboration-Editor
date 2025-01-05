import Tile from "../common/Tile";
import { useSearch } from "../../hooks/useSearch";
import NoResultsFound from "../NoResultsFound";

const AdminTiles = () => {
  const tiles = [
    { route: "/home", text: "Home" },
    { route: "/admin/rooms", text: "Rooms" },
    { route: "/admin/users", text: "Users" },
    { route: "/admin/roles", text: "Roles" },
  ];

  const {
    search,
    setSearch,
    filteredItems: filteredTiles,
  } = useSearch(tiles, "text");

  return (
    <div className="flex flex-col items-center py-8">
      {/* Search Input */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {filteredTiles.map((tile) => (
          <Tile key={tile.text} route={tile.route} text={tile.text} />
        ))}
        {filteredTiles.length === 0 && (
          <div className="flex items-center justify-center col-span-full h-40">
            <NoResultsFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTiles;
