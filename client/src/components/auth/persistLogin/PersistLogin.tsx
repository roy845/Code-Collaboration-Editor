import { Outlet } from "react-router-dom";
import { PersistLoginSpinner } from "../../common/Spinner";
import usePersistLogin from "../../../hooks/usePersistLogin";

const PersistLogin = () => {
  const { persist, isLoading } = usePersistLogin();

  return (
    <>
      {!persist ? <Outlet /> : isLoading ? <PersistLoginSpinner /> : <Outlet />}
    </>
  );
};

export default PersistLogin;
