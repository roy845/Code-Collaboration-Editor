type ConfirmDeleteRoomModalProps = {
  confirmationText: string;
  setConfirmationText: (value: string) => void;
  isDeleting: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

const ConfirmDeleteRoomModal: React.FC<ConfirmDeleteRoomModalProps> = ({
  confirmationText,
  setConfirmationText,
  isDeleting,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold text-white mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-400 mb-4">
          To confirm, please type{" "}
          <strong className="text-white">"Delete Room"</strong> in the input
          below.
        </p>
        <input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder="Type 'Delete Room' here"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={confirmationText !== "Delete Room" || isDeleting}
            className={`px-4 py-2 rounded-lg ${
              confirmationText !== "Delete Room" || isDeleting
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {isDeleting ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteRoomModal;
