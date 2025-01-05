import useLogout from "../../hooks/useLogout";

const AuthButton = (): React.JSX.Element => {
  const logout = useLogout();

  return (
    <>
      <button
        onClick={logout}
        className="px-4 py-2 bg-[#12020f] border border-white hover:bg-[#060b91] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Logout
      </button>
    </>
  );
};

export default AuthButton;
