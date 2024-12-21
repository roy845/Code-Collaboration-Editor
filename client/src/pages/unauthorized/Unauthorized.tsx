import { FaLock } from "react-icons/fa";
import useGoBack from "../../hooks/useGoBack";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Unauthorized: React.FC = () => {
  useDocumentTitle("Unauthorized");
  const goBack: () => void = useGoBack();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Unauthorized</h1>
      <p className="text-gray-600 text-lg">
        You do not have the necessary permissions to access this page.
      </p>
      <button
        onClick={goBack}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
