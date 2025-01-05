import { MdErrorOutline } from "react-icons/md";

type ErrorProps = {
  error: string;
};

const Error = ({ error }: ErrorProps): JSX.Element => {
  return (
    <div className="text-center text-red-500">
      <MdErrorOutline size={48} className="text-red-500 mx-auto" />
      <p className="text-gray-400 mt-4">{error}</p>
    </div>
  );
};

export default Error;
