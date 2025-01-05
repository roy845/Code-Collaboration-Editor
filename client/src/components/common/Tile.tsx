import useCustomNavigate from "../../hooks/useCustomNavigate";

export type TileProps = {
  text: string;
  route: string;
};

const Tile = ({ text, route }: TileProps) => {
  const navigate = useCustomNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className="p-4 flex items-center justify-center"
    >
      <div className="bg-gray-800 text-white cursor-pointer p-8 rounded-lg text-center shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl hover:box-shadow-lg hover:glow">
        {text}
      </div>
    </div>
  );
};

export default Tile;
