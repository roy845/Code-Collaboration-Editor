import React from "react";

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: string[];
}

const UserListModal: React.FC<UserListModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#0d0c22] rounded-lg w-1/3 p-4">
        <h2 className="text-lg font-bold mb-4">Users in Room</h2>
        <ul>
          {users.map((username) => (
            <li key={username} className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg font-bold">
                {username?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-white">{username}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserListModal;
