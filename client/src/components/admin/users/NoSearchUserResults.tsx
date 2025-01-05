import { MdSearchOff } from "react-icons/md";

const NoSearchUserResults = () => {
  return (
    <div className="text-center mt-8">
      <MdSearchOff size={48} className="text-gray-400 mx-auto" />
      <p className="text-gray-400 mt-4">No users found.</p>
    </div>
  );
};

export default NoSearchUserResults;
