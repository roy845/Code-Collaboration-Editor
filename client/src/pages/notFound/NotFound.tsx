import { MdErrorOutline } from "react-icons/md";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Button from "../../components/common/Button";
import useGoBack from "../../hooks/useGoBack";

const PageNotFound = (): JSX.Element => {
  useDocumentTitle("Page not found");
  const goBack = useGoBack();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <MdErrorOutline className="text-6xl text-red-500" />
      <h1 className="text-2xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button type="button" onClick={goBack} text="Go Back" />
    </div>
  );
};

export default PageNotFound;
