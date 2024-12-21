import {
  NavigateFunction,
  NavigateOptions,
  useNavigate,
} from "react-router-dom";

const useCustomNavigate = (): ((
  path: string,
  options?: NavigateOptions
) => void) => {
  const navigate: NavigateFunction = useNavigate();

  const customNavigate = (path: string, options?: NavigateOptions) => {
    navigate(path, options);
  };

  return customNavigate;
};

export default useCustomNavigate;
