import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Tooltip from "../../common/Tooltip";

type PasswordVisibilityProps = {
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
};

const PasswordVisibility = ({
  passwordVisible,
  togglePasswordVisibility,
}: PasswordVisibilityProps): JSX.Element => {
  return (
    <div
      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
      onClick={togglePasswordVisibility}
    >
      <Tooltip
        content={`Click to ${passwordVisible ? "hide" : "show"}  password`}
      >
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </Tooltip>
    </div>
  );
};

export default PasswordVisibility;
